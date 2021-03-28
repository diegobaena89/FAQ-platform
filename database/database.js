//importando móduclo para conexão com sequelize
const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas', 'root', '123456', {
  host: 'localHost',
  dialect: 'mysql'
});

//exportar conexão p utilizar em outros arquicos
module.exports = connection;