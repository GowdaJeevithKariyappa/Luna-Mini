const express = require("express");
const router = express.Router();

const { saveMood, getAIResponse } = require("../controllers/moodController");

router.post("/mood", saveMood);
router.post("/ai", getAIResponse);

module.exports = router;