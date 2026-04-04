const express = require("express");
const { generateProductDescription } = require("../controllers/productController");

const router = express.Router();

router.post("/generate", generateProductDescription);

module.exports = router;
