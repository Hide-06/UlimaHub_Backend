var Sequelize = require('sequelize');
var sequelize = require('./index');
var Usuario = require('./Usuario');

var Evento = sequelize.define('Evento', {
  titulo: { type: Sequelize.STRING, allowNull: false },
  fecha: { type: Sequelize.DATEONLY },
  tipo: { type: Sequelize.STRING },
});

Evento.belongsTo(Usuario);

module.exports = Evento;
