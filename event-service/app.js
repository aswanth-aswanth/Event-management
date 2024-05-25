const express = require('express');
// const connectDB = require('../shared/config/database');
const eventRoutes = require('./routes/eventRoutes');
const logger = require('../shared/config/logger');
require("./db");
const app = express();

// connectDB();

app.use(express.json());
app.use('/api/events', eventRoutes);

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
