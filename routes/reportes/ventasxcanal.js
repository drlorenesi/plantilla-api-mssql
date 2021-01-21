const express = require('express');
const moment = require('moment');
const router = express.Router();
const db = require('../../startup/db');

// Ventas Resumidas por Canal
// --------------------------
// http://localhost:3000/api/reportes/ventasxcanal?fecha=2019-11-18T17:30:35.000Z
router.get('/', async (req, res) => {
  let { fecha } = req.query;
  let test =
    fecha && moment(fecha).isValid()
      ? moment(fecha).format()
      : moment().format();
  res.send(test);
  // const { recordset } = await db.query(`
  // SELECT
  //   (SELECT TA.Nombre FROM VENDEDOR TA WHERE TA.Codigo = T0.Vendedor) Nombre,
  //   Uuid,
  //   Error,
  //   *
  // FROM [FACTURA MAESTRO] T0
  // WHERE Serie IN ('FC005','',' ','','','','') AND CAST(Fecha AS DATE) = '${fecha}'
  // ORDER BY Serie, Numero ASC
  // `);
  // res.send({ recordset });
});

module.exports = router;
