const logger = require('../startup/logger');
const debugDB = require('debug')('app:db');
const chalk = require('chalk');

module.exports = (error, req, res, next) => {
  debugDB(chalk.red('Error de Base de Datos - '), error.message);
  logger.error('Erro de API - %s at %s', error, new Date());
  res
    .status(500)
    .json({ message: 'Lo sentimos, algo inesperado sucedió de nuestro lado.' });
};
