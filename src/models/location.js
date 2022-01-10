const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class Location extends Model { };

    Location.init({
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        poster: {
            type: DataTypes.STRING,
        },
        file: {
            type: DataTypes.STRING,
        },
        max_users: {
            type: DataTypes.INTEGER,
        }
    }, {
        sequelize,
        modelName: 'location',

        name: {
            singular: 'location',
            plural: 'locations',
        }
    });

    Location.associate = models => {
        Location.hasMany(models.GameSession);
    };

    return Location;
}