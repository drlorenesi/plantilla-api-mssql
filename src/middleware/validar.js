const { isEmpty } = require('lodash');

module.exports = (validador) => {
  return (req, res, next) => {
    if (isEmpty(req.body))
      return res.status(400).send('No se envió información.');
    const { error } = validador(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    next();
  };
};
