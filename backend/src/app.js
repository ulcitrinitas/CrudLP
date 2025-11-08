import express from "express"
import cors from "cors"
import mysql from "mysql2/promise"

import { json, Router } from "express"

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

// cria o objeto para gerenciar as rotas
const router = Router();

// define as configurações do servidor
app.use(express.json()); // retorna nas rotas o json
app.use(cors()); // ativa o cors

const info_bebidas = {
    nome: "Bebida",
    campos: "beb_nome, qtde, preco_uni, volume, tipo, forn_cod, marca"
};

function converterEmVetor(req_body) {

    let v = [];

    if (Array.isArray(req_body)) {
        v = req_body.map((b) => {
            return [
                b.beb_nome,
                b.qtde,
                b.preco_uni,
                b.volume,
                b.tipo,
                b.forn_cod,
                b.marca
            ];
        });
    }
    else {
        for (const chave in req_body) {
            v.push(req_body[chave]);
        }
    }

    console.log(v);

    return v;

}

// rotas para as bebidas
app.get("/bebidas", async (req, res) => {

    // bloco para tratar erros
    try {
        let [results, fields] = await connection.execute(`select * from ${info_bebidas.nome}`);

        res.status(200).json(results);
    }
    catch (err) {
        console.error("Erro! Problemas com o banco de dados", err);
        connection.end();
        res.status(404).json({ msg: `Erro com o banco de dados`, error: err });
    }
})
    .post("/bebidas", async (req, res) => {

        try {

            let bebidas = converterEmVetor(req.body);

            await connection.beginTransaction();

            let [results] = await connection.query(
                `insert into ${info_bebidas.nome} ( ${info_bebidas.campos} ) values (?)`,
                [bebidas]
            );

            await connection.commit();

            res.status(201).json({
                message: `${results.affectedRows} bebidas inseridas`,
                bebidas: bebidas
            });

        }
        catch (err) {
            console.error("Erro! Problemas com o banco de dados", err);

            connection.rollback();

            res.status(404).json({ msg: `Erro com o banco de dados`, error: err });
        }
    })
    .put("/bebidas/:id", async (req, res) => {

        let id = req.params.id;

        let bebidas = converterEmVetor(req.body);

        let sql = `update ${info_bebidas.nome}
        set beb_nome = ?, qtde = ?, preco_uni = ?, volume = ?, tipo = ?, forn_cod = ?, marca = ?
        where beb_cod = ?
        `;

        bebidas.push(id);

        console.log(`Bebidas vetor: ${JSON.stringify(bebidas)}`);

        try {
            await connection.beginTransaction();

            let [results] = await connection.query(sql, bebidas);

            await connection.commit();

            res.status(201).json({
                message: `${results.affectedRows} bebidas atualizadas`,
                bebidas: results
            });
        }
        catch (err) {
            console.error("Erro! Problemas com o banco de dados", err);

            await connection.rollback();

            res.status(404).json({ msg: `Erro com o banco de dados`, error: err });
        }

    })
    .delete("/bebidas/:id", async (req, res) => {

        let id = req.params.id;

        try {
            await connection.beginTransaction();

            let [results] = await connection.query(
                `delete from ${info_bebidas.nome} where beb_cod = ${id} limit 1`,
            );

            await connection.commit();

            res.status(201).json({
                message: `${results.affectedRows} bebidas deletadas`,
                bebidas: results
            });
        }
        catch (err) {
            console.error("Erro! Problemas com o banco de dados", err);

            await connection.rollback();

            res.status(404).json({ msg: `Erro com o banco de dados`, error: err });
        }

    });

//inicia o servidor
app.listen(port, () => {
    console.log(`Running in localhost:${port}`);
});
