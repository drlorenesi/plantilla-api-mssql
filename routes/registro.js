// REFACTOR TO MS SQL
// REFACTOR TO MS SQL
// REFACTOR TO MS SQL
// REFACTOR TO MS SQL
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');
const validar = require('../middleware/validar');
const generaAuthToken = require('../utils/generaAuthToken');
const db = require('../startup/db');

const validateRegistro = (account) => {
  const schema = Joi.object({
    nombre: Joi.string().min(2).required(),
    apellido: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    pass: Joi.string().min(4).required(),
  });
  return schema.validate(account);
};

// Register new Account

router.post('/', [validar(validateRegistro)], async (req, res) => {
  let { nombre, apellido, email, pass } = req.body;
  // Check if emaill is already registered
  const { rowsAffected } = await db.query(
    `SELECT * FROM usuarios_web WHERE email LIKE '${email}'`
  );
  if (rowsAffected[0] !== 0)
    return res.status(400).send('Please use another email.');
  res.send('Here.');
  // const salt = await bcrypt.genSalt(10);
  // password = await bcrypt.hash(password, salt);
  // const { rows } = await db.query(
  //   `INSERT INTO users (first_name, last_name, email, pass)
  //     VALUES ($1, $2, $3, $4) RETURNING *`,
  //   [firstName, lastName, email, password]
  // );
  // // Create payload and send JWT so user can directly log in
  // const payload = {
  //   userId: rows[0].user_id,
  //   roleId: rows[0].role_id,
  //   firstName: rows[0].first_name,
  //   lastName: rows[0].last_name,
  //   email: rows[0].email,
  // };
  // const token = generaAuthToken(payload, process.env.jwtPrivateKey);
  // res
  //   .header('x-auth-token', token)
  //   .header('access-control-expose-headers', 'x-auth-token')
  //   .send(payload);
});

module.exports = router;
