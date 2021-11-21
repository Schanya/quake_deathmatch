const InitData = require('../repositories/initData')

class DbInitialize {
    initialize = (app) => {
        const db = require("../models");
        app.set('sequelize', db.sequelize);
        app.set('models', db);
        db.sequelize.sync()
            .then(() => InitData.initRoles(db))
            .then(() => app.logger.info('Sequelize synced'))
            .catch((error) => {
                app.logger.error('Sequelize sync failed: ', error.messag);
            });
    };
}
module.exports = new DbInitialize();