const db = require('../models');

class Locations {
    async createLocation(name, description, poster, file, maxUsers) {
        const max_users = maxUsers;
        const location = await db.Location({ name, description, poster, file, max_users });

        await location.save();
    }
}

module.exports = new Locations();