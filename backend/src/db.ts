import mysql from "mysql2/promise"
async function connect_db(user: string, pass: string, host: string, port: Number, db: string) {
    // const mysql_url = "mysql://root:mypass@localhost:3308/lp_crud";
    const mysql_url = `mysql://${user}:${pass}@${host}:${port}/${db}`;
    const conn = await mysql.createConnection(mysql_url);

    return conn;
}

export { connect_db };
