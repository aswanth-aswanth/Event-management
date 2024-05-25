const express = require('express');
const eventRoutes = require('./routes/eventRoutes');
require("./db");
const app = express();

// connectDB();

app.use(express.json());
app.use('/api/events', eventRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
