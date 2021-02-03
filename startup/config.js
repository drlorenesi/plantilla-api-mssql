const chalk = require('chalk');

module.exports = () => {
  if (!process.env.jwtPrivateKey) {
    console.error(chalk.red('ERROR TERMINAL: jwtPrivateKey no esta definida.'));
    process.exit(1);
  }
};
