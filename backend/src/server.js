import express from "express"
import cors from "cors"

import mysql from "mysql2/promise"

// define qual porta o express vai usar
const port = 3000;

// cria a conexão com banco de dados
const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    database: "lp_crud"
}).catch(err => {
    console.error(`Erro com a conexão`, err)
});

// cria o objeto do express
const app = express();

// define as configurações do servidor
app.use(express.json()); // retorna nas rotas o json
app.use(cors()); // ativa o cors

// rota get para bebidas
app.get("/", async (req, res) => {

    // bloco para tratar erros
    try {
        let [results, fields] = await connection.execute("select * from Bebida");

        res.status(201).json(results);
    }
    catch (err) {
        console.error("Erro! Problemas com o banco de dados", err);
        res.status(501).json({ msg: `Erro com o banco de dados`, error: err });
    }
});

//inicia o servidor
app.listen(port, () => {
    console.log(`Running in localhost:${port}`);
});
