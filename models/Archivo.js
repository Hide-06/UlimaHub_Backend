var Sequelize = require('sequelize');
var sequelize = require('./index');
var Usuario = require('./Usuario');
var Curso = require('./Curso');

var Archivo = sequelize.define('Archivo', {
  nombre: { type: Sequelize.STRING, allowNull: false },
  tipo: { type: Sequelize.STRING },
});

Archivo.belongsTo(Curso);
Archivo.belongsTo(Usuario);

module.exports = Archivo;
