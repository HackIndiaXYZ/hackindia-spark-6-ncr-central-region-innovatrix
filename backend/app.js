const express = require("express");
const cors = require("cors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Agents Marketplace backend is running",
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;
