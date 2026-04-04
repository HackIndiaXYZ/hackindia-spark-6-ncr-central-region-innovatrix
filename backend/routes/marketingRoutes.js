const express = require("express");
const { generateMarketingContent } = require("../controllers/marketingController");

const router = express.Router();

router.post("/generate", generateMarketingContent);

module.exports = router;
