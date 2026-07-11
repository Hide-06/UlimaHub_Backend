var Sequelize = require('sequelize');
var sequelize = require('./index');

var Usuario = sequelize.define('Usuario', {
  nombre: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false, unique: true },
  password: { type: Sequelize.STRING, allowNull: false },
  ciclo: { type: Sequelize.STRING },
});

module.exports = Usuario;
