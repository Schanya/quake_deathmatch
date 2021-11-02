const Sequelize = require('sequelize')

// определяем модель Role
module.exports = (sequelize) => {
    return sequelize.define("Role", {
        name: {
            type: Sequelize.STRING,
            unique: true,
            default: "USER"
        }
    });
    /* Role.associate = models => {
         Role.belongsToMany(models.User, {
             through: "user_role",
             as: "user",
             foreignKey: "role_id",
         });
     }*/
};

