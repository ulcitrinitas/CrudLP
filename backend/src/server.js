import express from "express"
import cors from "cors"

import mysql from "mysql2"

// define qual porta o express vai usar
const port = 3000;

// cria a conexão com banco de dados
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    database: "lp_crud"
});

let result = [];

connection.execute("select * from Bebida", (err, results, fields) => {
    if (err) {
        console.error(`Erro: ${err}\nProblema com o banco de dados`);
    }

    result = results;

    console.log(`Query result: ${JSON.stringify(results)}`);
    console.log(`Schema results: ${fields}`);
});

console.log(`Results: ${JSON.stringify(result)}`);


// cria o objeto do express
const app = express();

// define as configurações do servidor
app.use(express.json()); // retorna nas rotas o json
app.use(cors()); // ativa o cors

// rota get para bebidas
app.get("/", (req, res) => {
    res.json({ hello: "world", query_results: result });
});

//inicia o servidor
app.listen(port, () => {
    console.log(`Running in localhost:${port}`);
});
