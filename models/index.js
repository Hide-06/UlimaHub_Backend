var Sequelize = require('sequelize');

var sequelize = new Sequelize(
  process.env.DB_NAME || 'ulimahub',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'tu_contrasena',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    dialectOptions: process.env.DB_HOST
      ? { ssl: { require: true, rejectUnauthorized: false } }
      : {},
  }
);

module.exports = sequelize;
