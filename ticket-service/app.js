const express = require("express");
const ticketRoutes = require("./routes/ticketRoutes");

const app = express();

require("./db");

app.use(express.json());
app.use("/api/tickets", ticketRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;
