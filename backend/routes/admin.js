const express = require("express");
const Course = require("../models/Course");

const router = express.Router();

// Add course
router.post("/add-course", async (req, res) => {
  const { title, description, fee, duration } = req.body;
  try {
    const newCourse = new Course({ title, description, fee, duration });
    await newCourse.save();
    res.json({ msg: "Course added successfully", course: newCourse });
  } catch (err) {
    res.status(500).json({ msg: "Error adding course", error: err.message });
  }
});

// Get all courses
router.get("/all-courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching courses", error: err.message });
  }
});

module.exports = router;
