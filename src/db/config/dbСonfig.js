module.exports = {
  host: process.env.MYSQL_DB_HOST || "localhost",
  port: '3306',
  user: "root",
  password: "SCH08",
  DB: "quake_db",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  secret: "SECRET_KEY_RANDOM"
};