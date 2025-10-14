import mysql from "mysql2"

// mysql://:@:/

const db_url = "mysql://root:mypass@localhost:3308/lp_crud";

const pool = mysql.createPool(db_url);

let query_result = [];
let schema = [];

pool.execute("SELECT * FROM beb_info", (err, rows, fields) => {
    if (err == null) {
        console.log("------------------------------------------------------------------------------------------");
        console.log(rows);
        console.log("------------------------------------------------------------------------------------------");
        console.log(fields);
        console.log("------------------------------------------------------------------------------------------");
        query_result = rows;
        schema = fields;
    }
    else {
        console.log(err);
    }
});

pool.execute(`SELECT nome, cnpj, email, logradouro, numero, cidade, UF, pais
FROM Fornecedor as f
JOIN Endereco as e on f.endereco_cod = e.codigo_end`, (err, rows, fields) => {
    if (err == null) {
        console.log("------------------------------------------------------------------------------------------");
        console.log(rows);
        console.log("------------------------------------------------------------------------------------------");
        console.log(fields);
        console.log("------------------------------------------------------------------------------------------");
    }
    else {
        console.log(err);
    }
});