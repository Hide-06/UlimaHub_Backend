var Sequelize = require('sequelize');
var sequelize = require('./index');
var Usuario = require('./Usuario');

var Curso = sequelize.define('Curso', {
  nombre: { type: Sequelize.STRING, allowNull: false },
  profe: { type: Sequelize.STRING },
  creditos: { type: Sequelize.INTEGER },
  horario: { type: Sequelize.STRING },
  ciclo: { type: Sequelize.INTEGER },
});

Curso.belongsTo(Usuario);

module.exports = Curso;
