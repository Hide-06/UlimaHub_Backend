var Sequelize = require('sequelize');
var sequelize = require('./index');
var Usuario = require('./Usuario');
var Curso = require('./Curso');

var Nota = sequelize.define('Nota', {
  title: { type: Sequelize.STRING, allowNull: false },
  content: { type: Sequelize.TEXT },
});

Nota.belongsTo(Usuario);
Nota.belongsTo(Curso);

module.exports = Nota;
