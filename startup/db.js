// require('dotenv').config();
const { ConnectionPool } = require('mssql');
const debugDB = require('debug')('app:db');
const chalk = require('chalk');

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

// Probar conexión a base de datos
if (process.env.NODE_ENV === 'development') {
  (async function () {
    try {
      const db = await pool.connect();
      console.log(
        chalk.blue('- Conectado a'),
        chalk.magenta(db.config.database),
        chalk.blue('en'),
        chalk.magenta(db.config.server)
      );
    } catch (err) {
      console.log(chalk.red('Error de Base de Datos -'), err.message);
      return;
    }
  })();
}

module.exports = {
  async query(text, params) {
    const start = Date.now();
    const db = await pool.connect();
    const res = await db.query(text, params);
    const duration = Date.now() - start;
    debugDB(`Filas afectadas: ${res.rowsAffected}, duración: ${duration}`);
    return res;
  },
};
