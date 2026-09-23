const Mood = require("../models/Mood");
const axios = require("axios");

// Save mood
exports.saveMood = async (req, res) => {
  try {
    const { text, mood } = req.body;
    const newMood = new Mood({ text, mood });
    await newMood.save();
    res.json(newMood);
  } catch (err) {
    console.log("Could not save mood (MongoDB might not be running).");
    res.status(500).json({ error: "Could not save mood" });
  }
};

// AI response using local Ollama (Mistral)
exports.getAIResponse = async (req, res) => {
  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "mistral",
      prompt: `User feels: ${req.body.text}. Give a short positive uplifting message.`,
      stream: false
    });

    res.json({ reply: response.data.response });
  } catch (err) {
    console.log("Ollama error: ", err.message);
    res.json({ reply: "I'm here for you! 🌙 (Note: To get real AI responses, please install Ollama and the 'mistral' model on your device, or ensure it is running locally.)" });
  }
};