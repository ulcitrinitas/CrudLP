import express from "express"
import { testConn, query } from "./db.js"

const router = express.Router();

router.use((req, res, next) => {
    console.log(`Beb time: ${Date.now()}`);
    next();
});

router.get("/", async (req, res) => {
    try {

        testConn();

        const [rows, fields] = await query(
            `
                SELECT beb_nome, qtde, preco_uni, tipo, volume, me.sigla as medida, f.nome as fornecedor, m.nome as marca
                FROM Bebida as b
                JOIN Fornecedor f ON b.beb_cod = f.id
                JOIN Marca m ON b.marca_cod = m.marca_cod
                JOIN Medida me ON b.volume_med = me.med_cod
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

router.post("/", (req, res, next) => {

    console.log(req.body);

    let bebidas = req.body;

    if (Array.isArray(bebidas)) {
        console.log(`Recebido um array com ${bebidas.length} itens:`);
        console.log(bebidas);

        console.log("Bebidas");
        bebidas.forEach((e, i) => {
            console.log(`item ${i} => ${JSON.stringify(e)}`);
        });
    }



    res.status(201).json({ User: { status: "Created!", data: req.body } });

});

export default router;