const db = require('../models');
const { QueryTypes } = require('sequelize');
const moment = require('moment');

class Locations {
    async getLocationById(id, transaction) {
        const newLocation = await db.Location.findOne({ where: { id } }, { transaction });

        return newLocation;
    }
    async getLocationByName(name, transaction) {
        const newLocation = await db.Location.findOne({ where: { name } }, { transaction });

        return newLocation;
    }
    async getLocations({ ofset, limit }) {
        const locations = await db.Location.findAll({
            ofset, limit,
            attributes: ["id", "name", "description", "poster", "file", "max_users"]
        })

        return locations;
    }
    async createLocation(name, description, poster, file, max_users) {
        const location = new db.Location({ name, description, poster, file, max_users });

        await location.save();
    }
    async deleteLocation(id, transaction) {
        await db.Location.destroy({ where: { id } }, { transaction })
    }
    async getLocationWithotORM(yearAndMonth) {
        yearAndMonth = yearAndMonth.yearAndMonth + '-1';
        var startDate = moment(yearAndMonth).toDate();
        var endDate = moment(startDate).add(1, 'month').subtract(1, 'days').add(86399, 'seconds').toDate();
        const location = await db.sequelize.query(
            `
        SELECT 
            *
        FROM
            locations AS ls
                JOIN
            (SELECT 
                COUNT(*), location_id
            FROM
                quake_db.game_sessions AS gs
            WHERE
                gs.createdAt BETWEEN :startDate AND :endDate
            GROUP BY location_id
            ORDER BY 1 DESC
            LIMIT 1) AS l ON l.location_id = ls.id;
        `,
            {
                replacements: { startDate: startDate, endDate: endDate },
                type: QueryTypes.SELECT
            })

        return location;
    }
    async getGameSessions(location) {
        const gameSession = await location.getGame_sessions();

        return gameSession;
    }
}

module.exports = new Locations();