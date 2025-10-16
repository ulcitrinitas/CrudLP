import express from "express"

import fornRouter from "./fornRouter.js";
import bebRouter from "./bebRouter.js";

const app = express();
const port = 3000;

app.use(express.json()); // converte o req.body para json

app.use("/fornecedores", fornRouter);
app.use("/bebidas", bebRouter);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})