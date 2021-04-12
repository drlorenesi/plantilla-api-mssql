const express = require('express');
const router = express.Router();
const { inicioDeMes, diaDeHoy } = require('../../../utils/generaFechas');
const db = require('../../../startup/db');

// Ventas Resumidas por Canal
// http://localhost:9000/api/reportes/ventas/ventasporcanal?fecha_ini=2021-02-01&fecha_fin=2021-02-03
router.get('/', async (req, res) => {
  let { fecha_ini, fecha_fin } = req.query;
  console.log(`Fecha ini: ${inicioDeMes(fecha_ini)}`);
  console.log(`Fecha fin: ${diaDeHoy(fecha_fin)}`);

  const { recordset } = await db.query(`
  DECLARE @f_ini DATETIME = '${inicioDeMes(fecha_ini)}'
  DECLARE @f_fin DATETIME = '${diaDeHoy(fecha_fin)}'

  SELECT	T1.[Descripcion General], ISNULL(T2.[Total Ventas sIVA],0) AS 'Total Ventas sIVA', 
      ISNULL(T3.[Total NC Devolución sIVA],0) AS 'Total NC Devolución sIVA', 
      ISNULL(T4.[Total NC Valor sIVA],0) AS 'Total NC Valor sIVA',
      ISNULL(T2.[Total Ventas sIVA],0) - ISNULL(T3.[Total NC Devolución sIVA],0) - ISNULL(T4.[Total NC Valor sIVA],0)  AS 'Total'
  FROM

  -- DIVISION CLIENTE
  (SELECT	DV.[Descripcion General], DV.Orden
  FROM	[DIVISION CLIENTE] AS DV) AS T1

  LEFT JOIN
  -- FACTURAS GRABADAS sIVA
  (SELECT DV.[Descripcion General],
      ISNULL(ROUND(SUM (CASE   
        WHEN FM.Moneda = 1 THEN FM.Total/1.12
        WHEN FM.Moneda != 1 THEN FM.Total*FM.[Tipo Cambio]
      END), 2), 0) AS 'Total Ventas sIVA'
  FROM	[FACTURA MAESTRO] AS FM
      LEFT JOIN [DIVISION CLIENTE] AS DV ON FM.[Division Cliente] = DV.Codigo
  WHERE	FM.Empresa = 1 AND CAST(FM.Fecha AS DATE) BETWEEN @f_ini AND @f_fin AND FM.Estatus = 'G'
  GROUP BY DV.[Descripcion General]) AS T2 ON T1.[Descripcion General] = T2.[Descripcion General]

  LEFT JOIN
  -- NOTAS DE CRÉDITO DEVOLUCION sIVA
  (SELECT	DC.[Descripcion General],
      ROUND(SUM (CASE   
        WHEN CXC.Moneda = 1 THEN CXC.Total/1.12
        WHEN CXC.Moneda != 1 THEN CXC.Total*CXC.[Tipo Cambio]
      END), 2) AS 'Total NC Devolución sIVA'
  FROM	[CXC MAESTRO] AS CXC
      LEFT JOIN CLIENTE AS C ON CXC.Cliente = C.Codigo AND CXC.Empresa = C.Empresa
      LEFT JOIN [DIVISION CLIENTE] AS DC ON C.Division = DC.Codigo
  WHERE	CXC.Empresa = 1 AND CXC.Tipo = 14 AND CAST(CXC.Fecha AS DATE) BETWEEN @f_ini AND @f_fin AND CXC.Estatus = 'G'
  GROUP BY DC.[Descripcion General]) AS T3 ON T1.[Descripcion General] = T3.[Descripcion General]

  LEFT JOIN 
  -- NOTAS DE CRÉDITO VALOR sIVA
  (SELECT	DC.[Descripcion General],
      ROUND(SUM (CASE   
        WHEN CXC.Moneda = 1 THEN CXC.Total/1.12
        WHEN CXC.Moneda != 1 THEN CXC.Total*CXC.[Tipo Cambio]
      END), 2) AS 'Total NC Valor sIVA'
  FROM	[CXC MAESTRO] AS CXC
      LEFT JOIN CLIENTE AS C ON CXC.Cliente = C.Codigo AND CXC.Empresa = C.Empresa
      LEFT JOIN [DIVISION CLIENTE] AS DC ON C.Division = DC.Codigo
  WHERE	CXC.Empresa = 1 AND CXC.Tipo = 2 AND CAST(CXC.Fecha AS DATE) BETWEEN @f_ini AND @f_fin AND CXC.Estatus = 'G'
  GROUP BY DC.[Descripcion General]) AS T4 ON T1.[Descripcion General] = T4.[Descripcion General]

  ORDER BY T1.Orden
  `);
  res.send(recordset);
});

module.exports = router;
