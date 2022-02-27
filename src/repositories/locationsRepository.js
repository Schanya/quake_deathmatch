const db = require('../models');

class Locations {
    async getLocation(name, transaction) {
        const newLocation = await db.Location.findOne({ where: { name } }, { transaction });

        return newLocation;
    }
    async getLocationById(id) {
        const location = await db.Location.findOne({ where: { id } });

        return location;
    }
    async updateLocation(id, locationData) {
        const newLocation = await db.Location.update(locationData, { where: { id } });

        return newLocation;
    }
    async createLocation(name, description, poster, file, max_users) {
        const location = new db.Location({ name, description, poster, file, max_users });

        await location.save();
    }
    async deleteLocation(id, transaction) {
        await db.Location.destroy({ where: { id } }, { transaction })
    }
}

module.exports = new Locations();