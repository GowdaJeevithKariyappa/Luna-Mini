const mongoose = require("mongoose");

const MoodSchema = new mongoose.Schema({
  text: String,
  mood: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Mood", MoodSchema);
