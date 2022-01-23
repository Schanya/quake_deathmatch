const Delete = require('../errors/deleteError');
const { sequelize } = require('../models');
const pagination = require('../helpers/pagination');

const locationsRepository = require('../repositories/locationsRepository');

class LocationsService {
    getLocation = async (id) => {
        const newLocation = await locationsRepository.getLocation(id);

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
        //прояверть связана ли локация с сессией и если связана с не активной, то удалять и сессию
        //как вынести транзакцию отдельно в какой-нибудь мидлвар или что-то типо того?
        const transaction = await sequelize.transaction();
        try {
            await locationsRepository.deleteLocation(locationId, transaction)

            transaction.commit();
        } catch (error) {
            transaction.rollback();

            throw new Delete('Failed to delete location');
        }

    }
}

module.exports = new LocationsService();