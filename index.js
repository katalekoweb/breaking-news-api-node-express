const express = require("express") // requires vs import, commonjs vs es modules

const app = express()

// Route
    // Http Methods: (CRUD) -> Create, Read, Update, Delete
    //  GET : busca uma info, 
    //  POST : cria uma info, 
    //  PUT : atualiza toda info, 
    //  PATCH : atualiza uma parte da info,
    //  DELETE : remove uma info  
    
    // Rest sao boas praticas para nomear rotas, usar verbos http corretamente, e usar funcoes de callback para lidar com as requisicoes e respostas

    // Names:Identificador da rota. Deve ser unico

    // Function (Callback): (req, res) => {} // possui dois parametros, request e response, que sao objetos que representam a requisicao e resposta da rota. O request possui informacoes sobre a requisicao, como parametros, corpo, etc. O response possui metodos para enviar a resposta ao cliente, como res.send(), res.json(), etc.

app.get('/soma', function (req, res) {
    const soma = 1000+3
    
    res.send({soma:soma})
})

app.listen(3000)