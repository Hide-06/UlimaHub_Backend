var Sequelize = require('sequelize');
var sequelize = require('./index');
var Grupo = require('./Grupo');

var Chat = sequelize.define('Chat', {
  nombre: { type: Sequelize.STRING, allowNull: false },
  tipo: { type: Sequelize.STRING },
});

Chat.belongsTo(Grupo);

module.exports = Chat;
