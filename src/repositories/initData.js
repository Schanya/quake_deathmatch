const db = require('../models/index');

class InitData {
    initRoles = () => {
        db.Role.findOne({ name: "USER" })
            .then(role => {
                if (!role) {
                    db.Role.create({ name: "USER" });
                }
            });

        db.Role.findOne({ name: "ADMIN" })
            .then(role => {
                if (!role) {
                    db.Role.create({ name: "ADMIN" });
                }
            });
    }
}

module.exports = new InitData();