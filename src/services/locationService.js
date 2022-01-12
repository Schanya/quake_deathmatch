const locationsRepository = require('../repositories/locationsRepository');

class LocationsService {
    addLocation = async (name, description, poster, file, max_users) => {
        await locationsRepository.createLocation(name, description, poster, file, max_users);
    }
    // deleteLocation = async (userId) => {
    //     await usersRepository.deleteUser(userId)

    // }
}

module.exports = new LocationsService();