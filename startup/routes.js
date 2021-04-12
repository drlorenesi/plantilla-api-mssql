// Dependencies
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
// Rutas
const fecha = require('../routes/fecha');
const registro = require('../routes/registro');
const ventasporcanal = require('../routes/reportes/ventas/ventasPorCanal');
const inventariospt = require('../routes/reportes/inventarios/inventariospt');
// Error middleware
const error = require('../middleware/error');

module.exports = (app) => {
  // Middleware
  app.use(express.json());
  app.use(express.static('public'));
  app.use(cors());
  if (app.get('env') === 'development') {
    app.use(morgan('dev'));
  }
  // Rutas
  app.use('/api/fecha', fecha);
  app.use('/api/registro', registro);
  app.use('/api/reportes/ventas/ventasporcanal', ventasporcanal);
  app.use('/api/reportes/inventarios/inventariospt', inventariospt);
  // Error middleware (after routes)
  app.use(error);
};
