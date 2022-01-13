const gameSessionsRepository = require('../repositories/gameSessionRepository');
const locationService = require('./locationService');
const usersService = require('./usersService');

class GameSessionsService {
    // getLocation = async (name) => {
    //     const newLocation = await locationsRepository.getLocation(name);

    //     return newLocation;
    // }

    addGameSession = async (name, max_users, userId, nameLocation) => {
        const location = await locationService.getLocation(nameLocation);
        const is_active = true;
        const newGameSession = await gameSessionsRepository.createGameSession(name, max_users, is_active);

        const user = await usersService.getUserById(userId);
        await gameSessionsRepository.addUserToGameSession(newGameSession, user);

        await gameSessionsRepository.addGameSessionToLocation(newGameSession, location);
    }
    // deleteLocation = async (locationName) => {
    //     const location = await locationsRepository.getLocation(locationName);

    //     const locationId = location.id;

    //     await locationsRepository.deleteLocation(locationId)

    // }
}

module.exports = new GameSessionsService();