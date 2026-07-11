var Sequelize = require('sequelize');
var sequelize = require('./index');

var Curso = sequelize.define('Curso', {
  nombre: { type: Sequelize.STRING, allowNull: false },
  profe: { type: Sequelize.STRING },
  creditos: { type: Sequelize.INTEGER },
  horario: { type: Sequelize.STRING },
  ciclo: { type: Sequelize.INTEGER },
});

module.exports = Curso;
