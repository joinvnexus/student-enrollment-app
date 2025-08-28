//backend/server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

//API Routes
const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/courses");
const adminRoutes = require("./routes/admin");

// Initialize app
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/admin", adminRoutes);

// Connect to MongoDB Atlas
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected...'))
  .catch(err => console.error('❌ MongoDB connection error:', err));


// Simple test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
