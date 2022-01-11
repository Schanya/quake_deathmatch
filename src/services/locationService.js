const locationsRepository = require('../repositories/locationsRepository');

class LocationsService {
    addLocation = async (name, description, poster, file, maxUsers) => {
        await locationsRepository.createLocation(name, description, poster, file, maxUsers);
    }
    // deleteLocation = async (userId) => {
    //     await usersRepository.deleteUser(userId)

    // }
}

module.exports = new LocationsService();