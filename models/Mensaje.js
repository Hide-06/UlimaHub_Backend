var Sequelize = require('sequelize');
var sequelize = require('./index');
var Chat = require('./Chat');
var Usuario = require('./Usuario');

var Mensaje = sequelize.define('Mensaje', {
  texto: { type: Sequelize.TEXT, allowNull: false },
});

Mensaje.belongsTo(Chat);
Mensaje.belongsTo(Usuario, { as: 'Autor' }); // crea la columna AutorId

module.exports = Mensaje;
