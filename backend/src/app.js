import express from "express"
import cors from "cors"
import mysql from "mysql2/promise"

import { json, Router } from "express"

import { bebidasVetor, fornVetor } from "./functions.js"

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
    campos: "beb_nome, qtde, preco_uni, volume, tipo, forn_cod, marca"
};

const info_fornecedores = {
    nome: "Fornecedor",
    campos: "nome, cnpj, email, pais_cod, telefone, pais, endereco, uf"
};


// rota para pegar dados de ambas tabelas

app.get("/", async (req, res) => {

    try {
        let [results] = await connection.execute(
            `select beb_nome, qtde, preco_uni, tipo, nome, email, pais_cod, telefone, pais, endereco, marca
            from ${info_bebidas.nome} b
            join ${info_fornecedores.nome} f on b.forn_cod = f.id;`
        );

        res.status(200).json(results);
    }
    catch(err) {
        console.log("Erro! Problemas com o banco de dados", err);
        connection.end();
        res.status(404).json({msg: `Erro com o banco de dados`})
    }

});



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

            let bebidas = bebidasVetor(req.body);

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

        let bebidas = bebidasVetor(req.body);

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

// rotas para as fornecedores
app.get("/fornecedores", async (req, res) => {

    // bloco para tratar erros
    try {
        let [results, fields] = await connection.execute(`select * from ${info_fornecedores.nome}`);

        res.status(200).json(results);
    }
    catch (err) {
        console.error("Erro! Problemas com o banco de dados", err);
        connection.end();
        res.status(404).json({ msg: `Erro com o banco de dados`, error: err });
    }
})
    .post("/fornecedores", async (req, res) => {

        try {

            let fornecedores = fornVetor(req.body);

            await connection.beginTransaction();

            let [results] = await connection.query(
                `insert into ${info_fornecedores.nome} ( ${info_fornecedores.campos} ) values (?)`,
                [fornecedores]
            );

            await connection.commit();

            res.status(201).json({
                message: `${results.affectedRows} fornecedores inseridas`,
                bebidas: fornecedores
            });

        }
        catch (err) {
            console.error("Erro! Problemas com o banco de dados", err);

            connection.rollback();

            res.status(404).json({ msg: `Erro com o banco de dados` });
        }
    })
    .put("/fornecedores/:id", async (req, res) => {

        let id = req.params.id;

        let fornecedores = fornVetor(req.body);

        let sql = `update ${info_fornecedores.nome}
        set nome = ?, cnpj = ?, email = ?, pais_cod = ?, telefone = ?, pais = ?, endereco = ?, uf = ?
        where id = ?
        `;

        fornecedores.push(id);

        console.log(`fornecedores vetor: ${JSON.stringify(fornecedores)}`);

        try {
            await connection.beginTransaction();

            let [results] = await connection.query(sql, fornecedores);

            await connection.commit();

            res.status(201).json({
                message: `${results.affectedRows} fornecedores atualizadas`,
                fornecedores: results
            });
        }
        catch (err) {
            console.error("Erro! Problemas com o banco de dados", err);

            await connection.rollback();

            res.status(404).json({ msg: `Erro com o banco de dados`, error: err });
        }

    })
    .delete("/fornecedores/:id", async (req, res) => {

        let id = req.params.id;

        try {
            await connection.beginTransaction();

            let [results] = await connection.query(
                `delete from ${info_fornecedores.nome} where id = ${id} limit 1`,
            );

            await connection.commit();

            res.status(201).json({
                message: `${results.affectedRows} fornecedores deletadas`,
                fornecedores: results
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
