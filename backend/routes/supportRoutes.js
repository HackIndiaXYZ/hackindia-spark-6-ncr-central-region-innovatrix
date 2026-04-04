const express = require("express");
const { chatWithSupportAgent } = require("../controllers/supportController");

const router = express.Router();

router.post("/chat", chatWithSupportAgent);

module.exports = router;
