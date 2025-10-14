import mysql from "mysql2"

// mysql://:@:/

const db_url = "mysql://root:mypass@localhost:3308/lp_crud";

const pool = mysql.createPool(db_url);

async function testConn() {

    try {
        const conn = await pool.getConnection();

        conn.release();

        console.log("Conexão com o MySQL estabelecida com sucesso!");

        return pool;
    }
    catch (err) {
        console.error('Erro ao conectar ao MySQL:', err.message);

        throw err;
    }

}

async function query(sql_query, values = []) {

    try {
        const [rows, fields] = await pool.execute(sql_query, values);

        return [rows, fields];
    }
    catch (err) {
        console.log(`Erro ao executar a consulta: ${err}`);
        throw err;
    }
}

export { testConn, query };
