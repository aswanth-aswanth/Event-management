const express = require('express');
const authRoutes = require('./routes/authRoutes');

const app = express();
require("./db");

// connectDB();

app.use(express.json());
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
