const { sequelize } = require('../models');

const Delete = require('../errors/deleteError');
const { NotAcceptableError } = require('../errors');

const locationsRepository = require('../repositories/locationsRepository');

const fileHandler = require('../helpers/fileHandler');

class LocationsService {
    getLocation = async (name) => {
        const newLocation = await locationsRepository.getLocation(name);

        return newLocation;
    }
    getLocationById = async (id) => {
        const location = await locationsRepository.getLocationById(id);

        return location;
    }
    updateLocation = async (id, locationData) => {
        return await locationsRepository.updateLocation(id, locationData);
    }
    addLocation = async (name, description, poster, file, max_users) => {
        await locationsRepository.createLocation(name, description, poster, file, max_users);
    }
    deleteLocation = async (locationName) => {
        //прояверть связана ли локация с сессией и если связана с не активной, то удалять и сессию
        //как вынести транзакцию отдельно в какой-нибудь мидлвар или что-то типо того?
        const transaction = await sequelize.transaction();
        try {
            const location = await locationsRepository.getLocation(locationName, transaction);

            const locationId = location.id;

            await locationsRepository.deleteLocation(locationId, transaction)
            transaction.commit();
        } catch (error) {
            transaction.rollback();
            throw new Delete('Failed to delete location');
        }

    }
    setFile = async (file, id, data) => {
        if (!file) {
            throw new NotAcceptableError("File was not loaded");
        }

        const location = await locationsRepository.getLocationById(id);
        const oldFileName = location.file;

        if (oldFileName && oldFileName !== "no_url") {
            fileHandler.delete(file, oldFileName);
        }

        await locationsRepository.updateLocation(id, data);
    }
}

module.exports = new LocationsService();