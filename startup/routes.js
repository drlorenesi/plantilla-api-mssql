// Dependencies
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
// Routes
const fecha = require('../routes/fecha');
const ventasporcanal = require('../routes/reportes/ventas/ventasPorCanal');
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
  // Routes
  app.use('/api/fecha', fecha);
  app.use('/api/reportes/ventas/ventasporcanal', ventasporcanal);
  // Error middleware (after routes)
  app.use(error);
};
