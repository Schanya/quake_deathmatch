const db = require('./index');

module.exports = () => {
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