import mysql from "mysql2/promise"

// mysql://:@:/

const db_url = "mysql://root:mypass@localhost:3308/lp_crud";

const pool = await mysql.createPool(db_url);

/**
 * Verifica e conecta com o mysql ou mariadb
 * no caso de erro ele lança a mensagem de erro
 * @returns retorna a pool de conexão com o mysql
 */

async function testConn() {

    const conn = await pool.getConnection();

    try {
        
        conn.release();

        console.log("Conexão com o MySQL estabelecida com sucesso!");

        return pool;
    }
    catch (err) {
        console.error('Erro ao conectar ao MySQL:', err.message);

        throw err;
    }
    finally {
        conn.end();
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
