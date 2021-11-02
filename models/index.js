const dbConfig = require("../config/db.config.js");

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

db.User = require("./user")(sequelize);
db.Role = require("./role")(sequelize);

//db.User.associate(db);
//db.Role.associate(db);

db.User.belongsToMany(db.Role, {
    through: "user_role",
    as: "roles",
    foreignKey: "user_id",
});

db.Role.belongsToMany(db.User, {
    through: "user_role",
    as: "users",
    foreignKey: "role_id",
});

module.exports = db;