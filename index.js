const express = require('express');
const app = express();

// Express usando EJS como View Engine
app.set('view engine', 'ejs'); //motor de html = EJS

app.get('/', (req,res) => {
  res.render('principal/perfil')
});
//express desenhar o arquivo html

app.listen(8080, () => {
  console.log("App rodando!")
})