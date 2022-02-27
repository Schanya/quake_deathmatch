const { BadRequestError } = require('../errors');
const { sequelize } = require('../models/index');
const pagination = require('../helpers/pagination');

const gameSessionsRepository = require('../repositories/gameSessionRepository');
const locationsRepository = require('../repositories/locationsRepository');
const usersRepository = require('../repositories/usersRepository');

const Delete = require('../errors/deleteError');


class GameSessionsService {
    getGameSessions = async ({ page, amount }) => {
        const options = pagination({ page, amount });
        const gameSessions = await gameSessionsRepository.getGameSessions(options);

        return gameSessions;
    }
    getGameSession = async () => {
        const gameSession = await gameSessionsRepository.getGameSessionByName();

        return gameSession;
    }
    getDetailedInformation = async (id) => {
        const gameSession = await gameSessionsRepository.getGameSession(id);

        return gameSession;
    }
    getUsersByGameSession = async (id) => {
        const gameSessesion = await gameSessionsRepository.getGameSessionById(id);
        const users = await gameSessionsRepository.getUsersByGameSession(gameSessesion);

        return users;
    }
    addGameSession = async (name, max_users, userId, nameLocation) => {
        const transaction = await sequelize.transaction();
        try {
            const location = await locationsRepository.getLocationByName(nameLocation, transaction);
            const is_active = true;
            const newGameSession = await gameSessionsRepository.createGameSession(name, max_users, is_active, transaction);

            const user = await usersRepository.findById(userId, transaction);
            const isUserHaveGameSession = await usersRepository.countGameSession(user, transaction);

            if (isUserHaveGameSession !== 0) {
                throw new BadRequestError('You can not create a game session, you are already connected to the game session');
            } else {
                await gameSessionsRepository.addUserToGameSession(newGameSession, user, transaction);

                await gameSessionsRepository.addGameSessionToLocation(newGameSession, location, transaction);
            }
        } catch (error) {
            transaction.rollback();

            throw new Delete('Failed to create session');
        }
    }

    // deleteLocation = async (locationName) => {
    //     const location = await locationsRepository.getLocation(locationName);

    //     const locationId = location.id;

    //     await locationsRepository.deleteLocation(locationId)

    // }
}

module.exports = new GameSessionsService();