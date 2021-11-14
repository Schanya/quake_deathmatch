const initData = require('../repository/initData')

module.exports = function (app) {
    const db = require("../models");
    app.set('sequelize', db.sequelize);
    app.set('models', db);
    db.sequelize.sync()
        .then(() => initData(db))
        .then(() => app.logger.info('Sequelize synced'))
        .catch((error) => {
            app.logger.error('Sequelize sync failed: ', error.messag);
        });
};