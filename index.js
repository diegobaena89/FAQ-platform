const express = require('express');
const app = express();

// Express usando EJS como View Engine
app.set('view engine', 'ejs'); //motor de html = EJS
app.use(express.static('public'))//define que quer arquivos estáticos(imagens, css, etc)

app.get('/:nome/:lang', (req,res) => {
  var nome = req.params.nome; //pega a info digitada pelo usuario e coloca na variavel
  var lang = req.params.lang; 
  var exibirMsg = true;
  var produtos = [
    {nome: 'doritos', preco: 3.14},
    {nome: 'coca-cola', preco: 5},
    {nome: 'leite', preco: 1.45},
    {nome: 'carne', preco: 8.55},
  ];

  res.render('index', {
    nome: nome, //passa as  variáveis pro HTML
    lang: lang,
    empresa: "Self-employed",
    age: 30,
    msg: exibirMsg,
    produtos: produtos,
  });
});
//express desenhar o arquivo html

app.listen(8080, () => {
  console.log("App rodando!");
});