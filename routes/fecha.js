const express = require('express');
const router = express.Router();
const db = require('../startup/db');

// Usuarios
// --------
router.get('/', async (req, res) => {
  const result = await db.query('SELECT GETDATE() AS DATE');
  res.send(result.recordset[0]);
});

module.exports = router;
