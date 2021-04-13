// require('dotenv').config();
const { ConnectionPool } = require('mssql');

const pool = new ConnectionPool({
  user: process.env.MSSQLUSER,
  password: process.env.MSSQLPASSWORD,
  server: process.env.MSSQLHOST,
  database: process.env.MSSQLDATABASE,
  options: {
    encrypt: false,
    enableArithAbort: true,
  },
});

async function connectDB() {
  const db = await pool.connect();
  console.log(`- Conectado a ${db.config.database} en ${db.config.server}`);
}

async function db(query) {
  const start = Date.now();
  const connection = await pool.connect();
  const result = await connection.query(query);
  const duration = Date.now() - start;
  console.log(`Filas afectadas: ${result.rowsAffected}, duración: ${duration}`);
  return result;
}

exports.connectDB = connectDB;
exports.db = db;
