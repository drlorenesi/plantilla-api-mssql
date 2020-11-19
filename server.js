// require("dotenv").config();
const app = require('./app');
const chalk = require('chalk');

const env = app.get('env').toUpperCase();
const port = process.env.PORT || 3000;

const server = app.listen(port, () =>
  console.log(
    chalk.blue(`- Ambiente: ${env}`),
    chalk.blue(`\n- Servidor iniciado en puerto: ${port}`)
  )
);
