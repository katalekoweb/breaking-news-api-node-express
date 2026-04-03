import express from "express" // requires vs import, commonjs vs es modules
import userRoute from './src/routes/user.route.js'
import connectDb from "./src/database/db.js"
import dotenv from 'dotenv';

dotenv.config();
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

connectDb()

app.use(express.json())
app.use("/user", userRoute)

const port =  process.env.PORT || 3000
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))