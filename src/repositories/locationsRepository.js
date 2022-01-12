const db = require('../models');

class Locations {
    async createLocation(name, description, poster, file, max_users) {
        const location = new db.Location({ name, description, poster, file, max_users });

        await location.save();
    }
}

module.exports = new Locations();