import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = () => {
    console.log("Se conectando ao banco de dados");  
    
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("Banco de dados conectado com sucesso");
    }).catch((error) => {
        console.error("Erro ao se conectar ao banco de dados:", error);
    });
}

// module.exports = connectDB;
export default connectDB