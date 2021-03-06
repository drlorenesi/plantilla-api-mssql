const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

// const corsOptions = {
//   origin: [/127.0.0.1/],
//   origin: 'http://127.0.0.1:5500/',
//   credentials: true,
// };

module.exports = (app) => {
  // app.use(cors(corsOptions));
  app.use(cors());
  app.use(express.json());
  app.use(express.static('./src/public'));
  app.use(cookieParser());
  if (app.get('env') === 'development') {
    app.use(morgan('dev'));
  }
  if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
    app.use(compression());
  }
};
