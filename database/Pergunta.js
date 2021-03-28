const Sequelize = require("sequelize");
const connection = require("./database");

//criação do Model
const Pergunta = connection.define('pergunta', {
  //definição dos campos da tabela
  titulo: {
    //definição dos tipos
    type: Sequelize.STRING,
    allowNull: false
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNull: false // não aceita valor nulo no campo
  }
});
//exporta o model para o banco de dados para que a tabela seja criada
Pergunta.sync({force: false}).then(()=>{});
//exportando o módulo de perguntas
module.exports = Pergunta;