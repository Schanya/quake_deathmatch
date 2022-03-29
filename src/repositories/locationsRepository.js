const db = require('../models');

class Locations {
    async getLocationById(id, transaction) {
        const newLocation = await db.Location.findOne({ where: { id } }, { transaction });

        return newLocation;
    }
    async getLocationByName(name, transaction) {
        const newLocation = await db.Location.findOne({ where: { name } }, { transaction });

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