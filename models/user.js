const Sequelize = require('sequelize')

// определяем модель User
module.exports = (sequelize) => {
    return sequelize.define("user", {
        name: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });
    /*User.associate = models => {
        User.belongsToMany(models.Role, {
            through: "user_role",
            as: "role",
            foreignKey: "user_id",
        });
    }*/
};
