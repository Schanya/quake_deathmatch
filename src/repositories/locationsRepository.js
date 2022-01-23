const db = require('../models');

class Locations {
    async getLocation(id, transaction) {
        const newLocation = await db.Location.findOne({ where: { id } }, { transaction });

        return newLocation;
    }
    async getLocations({ ofset, limit }) {
        const locations = await db.Location.findAll({
            ofset, limit,
            attributes: ["id", "name", "description", "poster", "file", "max_users"]
        })

        return locations;
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