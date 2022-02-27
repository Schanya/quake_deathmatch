const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {

    class UserInfo extends Model { };

    UserInfo.init({
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        avatar: {
            type: DataTypes.STRING,
        }
    }, {
        sequelize,
        modelName: 'users_info',
        name: {
            simple: 'user_info',
            plural: 'users_info',
        },
        deletedAt: true,
        paranoid: true,
    });

    return UserInfo;
}