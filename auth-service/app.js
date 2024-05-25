const express = require('express');
const connectDB = require('../shared/config/database');
const authRoutes = require('./routes/authRoutes');
const logger = require('../shared/config/logger');

const app = express();
require("./db");

// connectDB();

app.use(express.json());
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
