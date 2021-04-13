const fecha = require('../routes/fecha');
const ventasporcanal = require('../routes/reportes/ventas/ventasPorCanal');
const inventariospt = require('../routes/reportes/inventarios/inventariospt');

module.exports = (app) => {
  app.use('/api/fecha', fecha);
  app.use('/api/reportes/ventas/ventasporcanal', ventasporcanal);
  app.use('/api/reportes/inventarios/inventariospt', inventariospt);
};
