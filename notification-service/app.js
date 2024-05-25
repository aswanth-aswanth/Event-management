const express = require('express');
const logger = require('../shared/config/logger');

const app = express();

app.use(express.json());

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
