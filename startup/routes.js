// Dependencies
const express = require("express");
const morgan = require("morgan");
// Routes
const inicio = require("../routes/inicio");
// Error middleware
const error = require("../middleware/error");

module.exports = (app) => {
  // Middleware
  app.use(express.json());
  if (app.get("env") === "development") {
    app.use(morgan("dev"));
  }
  // Routes
  app.use("/", inicio);
  // Error middleware
  app.use(error);
};
