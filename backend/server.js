// Import Express framework (used to create backend server)
const express = require("express");

// Import Mongoose (used to connect and interact with MongoDB)
const mongoose = require("mongoose");

// Import CORS (allows frontend and backend to communicate)
const cors = require("cors");

// Import custom routes (handles API logic like mood or AI response)
const moodRoutes = require("./routes/moodRoutes");

// Create Express application
const app = express();


// ⚙️ MIDDLEWARE

// Enable CORS (important when frontend runs on different port, e.g., React on 3000)
app.use(cors());

// Allows server to read JSON data from requests (req.body)
app.use(express.json());


// 🧠 DATABASE CONNECTION (MongoDB)

// Connect to MongoDB using env variable or fallback to local
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/luna";
mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 3000 })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB not running. The app will still work, but moods won't be saved."));

// 🔗 ROUTES

// All routes starting with "/api" will be handled by moodRoutes file
app.use("/api", moodRoutes);


// 🌐 TEST ROUTE (Check if server is running)
app.get("/", (req, res) => {
  res.send("Luna Backend Running 🌙");
});


// 🚀 START SERVER

// Server listens on environment port or 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});