const express = require('express');
const app = express();

// Express usando EJS como View Engine
app.set('view engine', 'ejs'); //motor de html = EJS
app.use(express.static('public'))//define que quer arquivos estáticos(imagens, css, etc)

app.get('/', (req,res) => {


  res.render('index');
});
app.get("/perguntar", (req, res) =>{
  res.render("perguntar")
})

app.post("/salvarpergunta", (req,res) => {
  res.send("Formulário recebido")
})
app.listen(8080, () => {
  console.log("App rodando!");
});