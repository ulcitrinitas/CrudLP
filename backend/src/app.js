import { testConn, query } from "./db.js"

async function main() {

    testConn();

    const [rows, fields] = await query(`SELECT nome, cnpj, email, logradouro, numero, cidade, UF, pais
         FROM Fornecedor as f
         JOIN Endereco as e on f.endereco_cod = e.codigo_end;`
    );

    console.log(rows);
}

main();
