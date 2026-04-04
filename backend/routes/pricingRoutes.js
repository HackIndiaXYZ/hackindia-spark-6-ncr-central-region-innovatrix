const express = require("express");
const { suggestPricingStrategy } = require("../controllers/pricingController");

const router = express.Router();

router.post("/suggest", suggestPricingStrategy);

module.exports = router;
