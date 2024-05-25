const express = require('express');
const connectDB = require('../shared/config/database');
const ticketRoutes = require('./routes/ticketRoutes');
const logger = require('../shared/config/logger');

const app = express();

require("./db");

app.use(express.json());
app.use('/api/tickets', ticketRoutes);

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
