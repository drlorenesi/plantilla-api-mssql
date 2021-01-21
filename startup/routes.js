// Dependencies
const express = require('express');
const morgan = require('morgan');
// Routes
const fecha = require('../routes/fecha');
const test = require('../routes/test');
const ventasxcanal = require('../routes/reportes/ventasxcanal');
// Error middleware
const error = require('../middleware/error');

module.exports = (app) => {
  // Middleware
  app.use(express.json());
  app.use(express.static('public'));
  if (app.get('env') === 'development') {
    app.use(morgan('dev'));
  }
  // Routes
  app.use('/api/fecha', fecha);
  app.use('/api/test', test);
  app.use('/api/reportes/ventasxcanal', ventasxcanal);
  // Error middleware (after routes)
  app.use(error);
};
