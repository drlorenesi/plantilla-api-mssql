const express = require('express');
const router = express.Router();
const db = require('../../../startup/db');

// Inventarios de producto terminado
// http://localhost:9000/api/reportes/inventarios/inventariospt
router.get('/', async (req, res) => {
  const { recordset } = await db.query(`
  SELECT B.Descripcion 'Bodega', P.Codigo, P.[Codigo Alt],  P.Descripcion, P.[Precio Sugerido], SUM(E.Disponible) 'Inventario'
  FROM PRODUCTO P
  LEFT JOIN EXISTENCIA E ON P.Codigo = E.Producto
  LEFT JOIN BODEGA B ON E.Bodega = B.Codigo
  WHERE P.[Tipo Inventario] = 0 AND P.Estatus = 'Activo' AND B.Codigo = 5
  GROUP BY B.Descripcion, P.Codigo, P.[Codigo Alt],  P.Descripcion, P.[Precio Sugerido]
  ORDER BY P.[Codigo Alt]
  `);
  res.send(recordset);
});

module.exports = router;
