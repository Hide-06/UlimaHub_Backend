var Sequelize = require('sequelize');
var sequelize = require('./index');
var Usuario = require('./Usuario');

var Nota = sequelize.define('Nota', {
  title: { type: Sequelize.STRING, allowNull: false },
  content: { type: Sequelize.TEXT },
});

Nota.belongsTo(Usuario);

module.exports = Nota;
