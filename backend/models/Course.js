const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  fee: { type: Number, required: true },
  duration: String
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);
