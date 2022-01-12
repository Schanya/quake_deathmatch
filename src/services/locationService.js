const locationsRepository = require('../repositories/locationsRepository');

class LocationsService {
    getLocation = async (name) => {
        const newLocation = await locationsRepository.getLocation(name);

        return newLocation;
    }

    addLocation = async (name, description, poster, file, max_users) => {
        await locationsRepository.createLocation(name, description, poster, file, max_users);
    }
    deleteLocation = async (locationName) => {
        const location = await locationsRepository.getLocation(locationName);

        const locationId = location.id;

        await locationsRepository.deleteLocation(locationId)

    }
}

module.exports = new LocationsService();