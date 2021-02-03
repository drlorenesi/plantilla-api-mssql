const jwt = require('jsonwebtoken');

module.exports = (payload, key) => {
  return jwt.sign(payload, key);
};
