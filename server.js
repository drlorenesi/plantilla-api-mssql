// require("dotenv").config();
const app = require('./app');
const chalk = require('chalk');

const env = process.env.NODE_ENV.toUpperCase();
const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(
    chalk.blue(`- Ambiente:`),
    chalk.magenta(env),
    chalk.blue(`\n- Servidor iniciado en puerto:`),
    chalk.magenta(port)
  )
);
