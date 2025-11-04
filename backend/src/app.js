import express, { json } from "express"
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

const info_bebidas = {
    nome: "Bebida",
    campos: "beb_nome, qtde, preco_uni, volume, tipo, volume_med, forn_cod, marca"
};


// rotas para as bebidas
app.get("/bebidas", async (req, res) => {

    // bloco para tratar erros
    try {
        let [results, fields] = await connection.execute(`select * from ${info_bebidas.nome}`);

        res.status(201).json(results);
    }
    catch (err) {
        console.error("Erro! Problemas com o banco de dados", err);
        connection.end();
        res.status(501).json({ msg: `Erro com o banco de dados`, error: err });
    }
})
    .post("/bebidas", (req, res) => {

        try {

            let bebidas = req.body;

            let values = bebidas.map((b) => {
                return [
                    b.beb_nome,
                    b.qtde,
                    b.preco_uni,
                    b.volume,
                    b.tipo,
                    b.volume_med,
                    b.forn_cod,
                    b.marca
                ];
            });

            let [results] = connection.query(
                `insert into ${info_bebidas} ( ${info_bebidas.campos} ) values ?`,
                [values]
            );

            res.status(201).json(results);

        }
        catch (err) {
            console.error("Erro! Problemas com o banco de dados", err);
            connection.end();
            res.status(501).json({ msg: `Erro com o banco de dados`, error: err });
        }

    });

//inicia o servidor
app.listen(port, () => {
    console.log(`Running in localhost:${port}`);
});
