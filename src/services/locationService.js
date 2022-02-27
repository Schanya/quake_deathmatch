const Delete = require('../errors/deleteError');
const { sequelize } = require('../models');
const pagination = require('../helpers/pagination');

const locationsRepository = require('../repositories/locationsRepository');
const gameSessionRepository = require('../repositories/gameSessionRepository');

class LocationsService {
    getLocation = async (id) => {
        const newLocation = await locationsRepository.getLocationById(id);

        return newLocation;
    }
    getLocationByName = async (name) => {
        const newLocation = await locationsRepository.getLocationByName(name);

        return newLocation;
    }
    getLocations = async ({ page, amount }) => {
        const options = pagination({ page, amount });

        const locations = await locationsRepository.getLocations(options);

        return locations;
    }
    addLocation = async (name, description, poster, file, max_users) => {
        await locationsRepository.createLocation(name, description, poster, file, max_users);
    }
    deleteLocation = async (locationId) => {
        const transaction = await sequelize.transaction();
        try {
            const location = await locationsRepository.getLocationById(locationId, transaction);
            const gameSessions = await locationsRepository.getGameSessions(location);
            const gameSessionIds = gameSessions.map((gameSession) => gameSession.id);
            const gameSessionConditions = gameSessions.map((gameSession) => gameSession.active);
            if (gameSessionConditions.forEach(condition => condition === true)) {
                throw new Delete('Some session is active can not delete this location');
            } else {
                gameSessionIds.forEach(async (sessionId) => {
                    await gameSessionRepository.deleteGameSession(sessionId, transaction);
                })
                await locationsRepository.deleteLocation(locationId, transaction)

                transaction.commit();
            }
        } catch (error) {
            transaction.rollback();

            throw new Delete('Failed to delete location');
        }

    }
    endpoind = async (yearAndMonth) => {
        const location = await locationsRepository.getLocationWithotORM(yearAndMonth);

        return location;
    }
}

module.exports = new LocationsService();