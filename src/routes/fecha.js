const express = require('express');
const router = express.Router();
const { inicioDeMes, hoy } = require('../utils/generaFechas');
const { db } = require('../config/db');

// http://localhost:9000/api/fecha?fecha_ini=2021-02-01&fecha_fin=2021-02-28
router.get('/', async (req, res) => {
  let { fecha_ini, fecha_fin } = req.query;
  const { recordset } = await db(`
  DECLARE @fecha_ini DATETIME = '${inicioDeMes(fecha_ini)}'
  DECLARE @fecha_fin DATETIME = '${hoy(fecha_fin)}'

  SELECT
    DATEDIFF(year, @fecha_ini, @fecha_fin) diff_en_años,
    DATEDIFF(quarter, @fecha_ini, @fecha_fin) diff_en_trimestres,
    DATEDIFF(month, @fecha_ini, @fecha_fin) diff_en_meses,
    DATEDIFF(dayofyear, @fecha_ini, @fecha_fin) diff_en_dayofyear,
    DATEDIFF(day, @fecha_ini, @fecha_fin) diff_en_dias,
    DATEDIFF(week, @fecha_ini, @fecha_fin) diff_en_semanas;
  `);
  res.send({ fecha_ini, fecha_fin, recordset });
});

module.exports = router;
