const express = require('express');
const moment = require('moment');
const router = express.Router();
const db = require('../startup/db');

// http://localhost:9000/api/fecha?fecha_ini=2021-02-01&fecha_fin=2021-02-28
router.get('/', async (req, res) => {
  let { fecha_ini, fecha_fin } = req.query;
  // Obtener fecha inicial
  if (fecha_ini === undefined || !Boolean(fecha_ini)) {
    fecha_ini = moment().startOf('month').format('YYYY-MM-DD');
  } else if (fecha_ini && moment(fecha_ini).isValid()) {
    fecha_ini = moment(fecha_ini).format('YYYY-MM-DD');
  }
  // Obtener fecha final
  if (fecha_fin === undefined || !Boolean(fecha_fin)) {
    fecha_fin = moment().format('YYYY-MM-DD');
  } else if (fecha_fin && moment(fecha_fin).isValid()) {
    fecha_fin = moment(fecha_fin).format('YYYY-MM-DD');
  }
  // Realizar Query
  let { recordset } = await db.query(`
  DECLARE 
    @start_dt DATETIME = '${fecha_ini}', 
    @end_dt DATETIME = '${fecha_fin}';

  SELECT 
    DATEDIFF(year, @start_dt, @end_dt) diff_in_year, 
    DATEDIFF(quarter, @start_dt, @end_dt) diff_in_quarter, 
    DATEDIFF(month, @start_dt, @end_dt) diff_in_month, 
    DATEDIFF(dayofyear, @start_dt, @end_dt) diff_in_dayofyear, 
    DATEDIFF(day, @start_dt, @end_dt) diff_in_day, 
    DATEDIFF(week, @start_dt, @end_dt) diff_in_week;
    `);
  res.send({ fecha_ini, fecha_fin, recordset });
});

module.exports = router;
