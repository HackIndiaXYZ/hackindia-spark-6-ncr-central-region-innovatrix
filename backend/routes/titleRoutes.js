const express = require("express");
const { optimizeTitle } = require("../controllers/titleController");

const router = express.Router();

router.post("/optimize", optimizeTitle);

module.exports = router;
