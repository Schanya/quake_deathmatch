module.exports = {
  host: "localhost",
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
  }
};