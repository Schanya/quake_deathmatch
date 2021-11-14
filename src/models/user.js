const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {

    class User extends Model { };

    User.init({
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'user',

        // tableName: 'users', 

        name: {
            simple: 'user',
            plural: 'users',
        }
    });

    User.associate = models => {
        User.belongsToMany(models.Role, {
            through: "user_role",
            as: "role",
            foreignKey: "user_id",
        });
    }
    return User;
}