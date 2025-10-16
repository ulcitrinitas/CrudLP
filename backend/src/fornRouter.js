import express from "express"
import { testConn, query } from "./db.js"

const router = express.Router();

router.use((req, res, next) => {
    console.log(`Forn time: ${Date.now()}`);
    next();
});

router.get("/", async (req, res) => {
    try {

        testConn();

        const [rows, fields] = await query(
            `
            SELECT nome, cnpj, email, logradouro, numero, cidade, UF, pais
            FROM Fornecedor as f
            JOIN Endereco as e on f.endereco_cod = e.codigo_end;
            `
        );

        console.log(`rows: ${rows}`);
        console.log(`schema: ${fields}`);

        res.json(rows);
    }
    catch (err) {
        console.log(`Erro: ${err}`);
        res.status(500).send("Erro no servidor");
    }
});

export default router;

