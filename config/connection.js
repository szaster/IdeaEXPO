const mysql = require("mysql2");

let connection;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "localhost",
    database: "ideas_db",
    user: "root",
    port: 3306,
    password: "EmnvaznkzN7!",
  });
}

module.exports = connection;
