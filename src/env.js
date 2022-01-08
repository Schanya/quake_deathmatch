const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    app: {
        port: process.env.APP_PORT || 3000
    },

    db: {
        host: process.env.MYSQL_DB_HOST || "localhost",
        port: process.env.MYSQL_DB_PORT || '3306',
        user: process.env.MYSQL_DB_USER || "root",
        password: process.env.MYSQL_DB_PASSWORD || "SCH08",
        DB: process.env.MYSQL_DB_NAME || "quake_db",
        dialect: process.env.MYSQL_DB_DIALECT || "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        secret: process.env.MYSQL_DB_SECRET || "SECRET_KEY_RANDOM"
    },

    logger: {
        level: (process.env.LOGLEVEL || 'debug').toLowerCase(),
    }
}