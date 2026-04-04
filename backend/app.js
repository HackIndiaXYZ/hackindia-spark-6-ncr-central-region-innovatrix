const express = require("express");
const cors = require("cors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const agentRoutes = require("./routes/agentRoutes");
const marketingRoutes = require("./routes/marketingRoutes");
const pricingRoutes = require("./routes/pricingRoutes");
const productRoutes = require("./routes/productRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const supportRoutes = require("./routes/supportRoutes");
const titleRoutes = require("./routes/titleRoutes");

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

app.use("/api/agents", agentRoutes);
app.use("/api/marketing", marketingRoutes);
app.use("/api/pricing", pricingRoutes);
app.use("/api/product", productRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/title", titleRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
