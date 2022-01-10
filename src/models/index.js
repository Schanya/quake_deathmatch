const dbConfig = require("../db/config/dbСonfig");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//db для создания абстракции над sequqlize 
db.User = require("./user")(sequelize);
db.Role = require("./role")(sequelize);
db.Location = require("./location")(sequelize);
db.UserInfo = require("./userInfo")(sequelize);
db.GameSession = require("./gmeSession")(sequelize);

db.User.associate(db);
db.Role.associate(db);
db.GameSession.associate(db);
db.Location.associate(db);

module.exports = db;