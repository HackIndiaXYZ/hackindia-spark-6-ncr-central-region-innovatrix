const express = require("express");
const { getAgents } = require("../controllers/agentController");

const router = express.Router();

router.get("/", getAgents);

module.exports = router;
