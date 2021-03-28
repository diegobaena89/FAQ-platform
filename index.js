const express = require('express');
const app = express();
//responsável por traduzir os dados enviados pelo formulário em uma
//estrutura javascript
const bodyParser = require("body-parser") //require o body-parser
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta')

//Database
connection
  .authenticate()
  .then(() => {
    console.log('Conexão feita com o banco de dados!')
  })
  .catch((msgErro) => {
    console.log(msgErro);
  })

// Express usando EJS como View Engine
app.set('view engine', 'ejs'); //motor de html = EJS
app.use(express.static('public'))//define que quer arquivos estáticos(imagens, css, etc)

//body parser
//permite que a pessoa envie os dados do formulário e os dados sejam decodificados
app.use(bodyParser.urlencoded({ extended: true }));

// rotas
app.get("/", (req, res) => {
  Pergunta.findAll({ raw: true, order: [
    //ordena os id's
    ['id','DESC'] //ASC = crescente, DSC = decrescente
  ] }).then(perguntas => {
    res.render("index", {
      perguntas: perguntas
    });
  })

});

app.get("/perguntar", (req, res) =>{
  res.render("perguntar")
})

app.post("/salvarpergunta", (req,res) => {
  //pegando as informações do formulário através do name
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;
  //salva as perguntas no banco de dados
  Pergunta.create({
    titulo: titulo,
    descricao: descricao
  }).then(()=>{
    res.redirect("/");
  })
});

app.get("/pergunta/:id", (req, res) => {
  var id = req.params.id;
  Pergunta.findOne({
    where: {id: id}
  }).then(pergunta => {
    if(pergunta != undefined){ //pergunta encontrada

      Resposta.findAll({
        where: { perguntaId: pergunta.id },
        order: [
          ['id', 'DESC']
        ]
      }).then(respostas => {
        res.render("pergunta", {
          pergunta: pergunta,
          respostas: respostas
        });
      });

    }else { //pergunta não encontrada
      res.redirect("/")
    }
  });
});

app.post("/responder", (req,res) => {
  var corpo = req.body.corpo;
  var perguntaId = req.body.pergunta;
  Resposta.create({
    corpo: corpo,
    perguntaId: perguntaId
  }).then(()=> {
    res.redirect("/pergunta/"+perguntaId);
  })
});

app.listen(8080, () => {
  console.log("App rodando!");
});