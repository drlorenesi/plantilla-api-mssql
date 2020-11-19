// Express
const express = require('express');
const router = express.Router();
const pool = require('../startup/db');

// Inicio
// ------
router.get('/', async (req, res) => {
  const db = await pool.connect();
  const { recordset } = await db.query('SELECT GETDATE() AS DATE');
  res.send(recordset);
});

module.exports = router;
