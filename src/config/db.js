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

// Write async queries as:
// const result = await db('select 1');
async function db(query) {
  try {
    const start = Date.now();
    await pool.connect();
    const result = await pool.query(query);
    const duration = Date.now() - start;
    console.log(
      `Filas afectadas: ${result.rowsAffected}, duración: ${duration}`
    );

    return result.recordset;
  } catch (error) {
    console.log(error);
  }
}

exports.connectDB = connectDB;
exports.db = db;
