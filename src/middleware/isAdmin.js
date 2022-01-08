const Forbidden = require("../errors/forbiddenError");
const { ADMIN: admin } = require("../helpers/constants");

module.exports = (roles) => {
    return (req, res, next) => {
        const userRoles = req.user.Roles;
        let isAdmin = false;

        userRoles.forEach(role => {
            if (role.name === admin) {
                isAdmin = true;
            }
        });

        if (!isAdmin) {
            throw new Forbidden('You do not have sufficient rights to perform this action')
        }
        next();
    }
};