const logger = require('../config/logger');

module.exports = (error, req, res, next) => {
  logger.error('Error de API.\n%s', error);
  res
    .status(500)
    .send({ message: 'Lo sentimos, ocurrió un error inesperado.' });
};
