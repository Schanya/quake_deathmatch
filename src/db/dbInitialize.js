const InitData = require('../repositories/initData')
const db = require("../models");

class DbInitialize {
    initialize = async (app) => {
        app.set('sequelize', db.sequelize);
        app.set('models', db);
        try {
            await db.sequelize.sync();
            app.logger.info('Sequelize synced');
            await InitData.initRoles(db);
        } catch (error) {
            app.logger.error('Sequelize sync failed: ', error.messag);
        };
    };
}
module.exports = new DbInitialize();