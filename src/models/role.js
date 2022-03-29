const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class Role extends Model { };

    Role.init({
        name: {
            type: DataTypes.STRING,
            unique: true,
            default: "USER"
        },
    }, {
        sequelize,
        modelName: 'role',

        name: {
            singular: 'role',
            plural: 'roles',
        },
        deletedAt: true,
        paranoid: true,
    });

    Role.associate = models => {
        Role.belongsToMany(models.User, {
            through: "user_role",
            as: "user",
            foreignKey: "role_id",
        });
    };

    return Role;
}