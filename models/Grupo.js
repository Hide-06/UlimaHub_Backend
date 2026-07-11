var Sequelize = require('sequelize');
var sequelize = require('./index');
var Usuario = require('./Usuario');
var Curso = require('./Curso');

var Grupo = sequelize.define('Grupo', {
  nombre: { type: Sequelize.STRING, allowNull: false },
  miembros: { type: Sequelize.INTEGER, defaultValue: 0 },
  maximo: { type: Sequelize.INTEGER },
});

Grupo.belongsTo(Curso);
// belongsToMany crea la tabla intermedia GrupoMiembro (usuarios <-> grupos)
Grupo.belongsToMany(Usuario, { through: 'GrupoMiembro' });
Usuario.belongsToMany(Grupo, { through: 'GrupoMiembro' });

module.exports = Grupo;
