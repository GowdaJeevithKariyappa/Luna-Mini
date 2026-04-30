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

// Connect to local MongoDB database named "luna"
mongoose.connect("mongodb://127.0.0.1:27017/luna")

  // If connection successful
  .then(() => console.log("MongoDB Connected"))

  // If error occurs
  .catch(err => console.log(err));


// 🔗 ROUTES

// All routes starting with "/api" will be handled by moodRoutes file
app.use("/api", moodRoutes);


// 🌐 TEST ROUTE (Check if server is running)
app.get("/", (req, res) => {
  res.send("Luna Backend Running 🌙");
});


// 🚀 START SERVER

// Server listens on port 5000
app.listen(5000, () => {
  console.log("Server running on port 5000");
});