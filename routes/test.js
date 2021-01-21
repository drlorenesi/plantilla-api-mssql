const express = require('express');
const router = express.Router();
const db = require('../startup/db');
const moment = require('moment');

// Test
// ----
// http://localhost:3000/api/test?f_ini=2020-12-15T17:41:47.881Z
router.get('/', async (req, res) => {
  let { f_ini } = req.query;
  f_ini = moment().format();
  console.log(f_ini);

  // const { recordset } = await db.query(
  //   `SELECT ${inicio} as date, GETDATE() as now`
  // );
  // res.send(recordset);
  res.send(f_ini);
});

module.exports = router;
