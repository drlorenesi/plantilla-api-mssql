// require('dotenv').config();
const sql = require('mssql');
const chalk = require('chalk');
const logger = require('./logger');

const pool = new sql.ConnectionPool({
  user: process.env.MSSQLUSER,
  password: process.env.MSSQLPASSWORD,
  server: process.env.MSSQLHOST,
  database: process.env.MSSQLDATABASE,
  options: {
    encrypt: false,
    enableArithAbort: true,
  },
});

// Test Database connection
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
      logger.error(
        'Error de conexión a Base de Datos - %s at %s',
        err,
        new Date()
      );
    }
  })();
}

module.exports = {
  query: async function (text, params) {
    const db = await pool.connect();
    return db.query(text, params);
  },
};
