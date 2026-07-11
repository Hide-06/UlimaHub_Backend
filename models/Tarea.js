var Sequelize = require('sequelize');
var sequelize = require('./index');
var Usuario = require('./Usuario');
var Curso = require('./Curso');

var Tarea = sequelize.define('Tarea', {
  titulo: { type: Sequelize.STRING, allowNull: false },
  fecha: { type: Sequelize.DATEONLY },
  estado: { type: Sequelize.STRING, defaultValue: 'pendiente' },
});

// belongsTo crea automaticamente la columna FK (CursoId, UsuarioId)
Tarea.belongsTo(Curso);
Tarea.belongsTo(Usuario);

module.exports = Tarea;
