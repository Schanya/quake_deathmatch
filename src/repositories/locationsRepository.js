const db = require('../models');

class Locations {
    async getLocation(name) {
        const newLocation = await db.Location.findOne({ where: { name } });

        return newLocation;
    }
    async createLocation(name, description, poster, file, max_users) {
        const location = new db.Location({ name, description, poster, file, max_users });

        await location.save();
    }
    async deleteLocation(id) {
        await db.Location.destroy({ where: { id } })
    }
}

module.exports = new Locations();