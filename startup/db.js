const sql = require("mssql");
const chalk = require("chalk");
const logger = require("./logger");

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

// Log connection at startup
(async function () {
  try {
    const db = await pool.connect();
    console.log(
      chalk.blue("- Connected to"),
      chalk.magenta(db.config.database),
      chalk.blue("on"),
      chalk.magenta(db.config.server)
    );
  } catch (err) {
    console.log(chalk.red("Database error ->"), err.message);
    logger.error("DB Connection Error - %s at %s", err, new Date());
    return;
  }
})();

module.exports = pool;
