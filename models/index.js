var Sequelize = require('sequelize');

var sequelize = new Sequelize('ulimahub', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
