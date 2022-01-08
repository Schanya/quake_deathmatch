const { db } = require('../../env');

module.exports = {
  host: db.host,
  port: db.port,
  user: db.user,
  password: db.password,
  DB: db.DB,
  dialect: db.dialect,
  pool: db.pool,
  secret: db.secret,
};