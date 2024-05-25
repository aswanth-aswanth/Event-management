const express = require("express");

const app = express();

app.use(express.json());

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;
