const Mood = require("../models/Mood");
const axios = require("axios");

// Save mood
exports.saveMood = async (req, res) => {
  const { text, mood } = req.body;

  const newMood = new Mood({ text, mood });
  await newMood.save();

  res.json(newMood);
};

// AI response
exports.getAIResponse = async (req, res) => {
  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "mistral",
      prompt: `User feels: ${req.body.text}. Give a short positive uplifting message.`,
      stream: false
    });

    res.json({ reply: response.data.response });
  } catch (err) {
    res.status(500).json({ error: "AI error" });
  }
};