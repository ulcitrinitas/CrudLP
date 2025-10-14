const mysql = require("mysql2/promise");

async function connect_db(db_url) {
    const mysql_url = `mysql://${db_url.user}:${db_url.pass}@${db_url.host}:${db_url.port}/${db_url.db}`;
    const conn = await mysql.createConnection(mysql_url);

    return conn;
}

export { connect_db };