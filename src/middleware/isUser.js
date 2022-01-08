const Forbidden = require("../errors/forbiddenError");
const { USER: user } = require("../helpers/constants");

module.exports = (roles) => {
    return (req, res, next) => {
        const userRoles = req.user.Roles;

        const isUser = userRoles.some(role => {
            return role.name === user
        });

        if (!isUser) {
            next(
                new Forbidden(
                    'You do not have sufficient rights to perform this action'
                )
            );
        }
        next();
    }
};