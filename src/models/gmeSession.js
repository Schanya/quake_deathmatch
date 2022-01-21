const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {

    class GameSession extends Model { };

    GameSession.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        max_users: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
        }
    }, {
        sequelize,
        modelName: 'game_session',

        name: {
            simple: 'game_session',
            plural: 'game_sessions',
        }
    });

    GameSession.associate = models => {
        GameSession.belongsToMany(models.User, {
            through: "user_sessions",
            as: "user",
            foreignKey: "game_session_id",
        });
        GameSession.belongsTo(models.Location, {
            foreignKey: {
                name: 'location_id'
            }
        })
    }

    return GameSession;
}