import { connect_db} from "./db"

// mysql://:@:/

const db_info = { user: "root", pass: "mypass", host: "localhost", port: 3308, db: "lp_crud" };

const conn = connect_db(db_info);

console.log(conn)