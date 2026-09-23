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

const { GoogleGenAI } = require('@google/genai');

// AI response using lightning-fast Gemini API
exports.getAIResponse = async (req, res) => {
  try {
    // Requires GEMINI_API_KEY to be set in environment
    if (!process.env.GEMINI_API_KEY) {
      return res.json({ reply: "I'm here for you! 🌙 (Note: Please add your GEMINI_API_KEY to your Vercel/Render Environment Variables to unlock lightning-fast AI!)" });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    let responseText = "";
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: `You are Luna, a calm and empathetic AI designed to provide emotional support. The user feels: "${req.body.text}". Give a short, positive, uplifting message. Keep it to 1 or 2 sentences maximum.`,
      });
      responseText = response.text;
    } catch (primaryErr) {
      console.log("Primary model busy, trying fallback...");
      // Fallback to a highly available older/smaller model
      const fallbackResponse = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: `You are Luna, a calm and empathetic AI designed to provide emotional support. The user feels: "${req.body.text}". Give a short, positive, uplifting message. Keep it to 1 or 2 sentences maximum.`,
      });
      responseText = fallbackResponse.text;
    }

    res.json({ reply: responseText });
  } catch (err) {
    console.log("Gemini API error: ", err.message);
    res.json({ reply: `Error from Gemini: ${err.message}` });
  }
};