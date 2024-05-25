const express = require('express');
const userRoutes = require('./routes/userRoutes');
const logger = require('../shared/config/logger');

const app = express();
require("./db");

app.use(express.json());
app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
