require('dotenv').config();
const express = require('express');

const app = express();

// Chequeo inicial
require('./config/startup')();
// Logger
require('./config/logger');
// Middleware
require('./config/middleware')(app);
// Rutas
require('./config/routes')(app);
// Manejador de Errores
app.use(require('./middleware/error'));

module.exports = app;
