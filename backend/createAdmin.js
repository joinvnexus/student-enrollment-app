require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); // তোমার User মডেল path ঠিক করো

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB connection error:", err));

// Admin create function
async function createAdmin() {
  try {
    const hashedPassword = await bcrypt.hash("admin123", 10); // password: admin123
    const admin = new User({
      name: "Admin Name",
      email: "admin@example.com",
      password: hashedPassword,
      phone: "1234567890",
      role: "admin",
      
    });

    await admin.save();
    console.log("✅ Admin created successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error creating admin:", err.message);
    process.exit(1);
  }
}

createAdmin();
