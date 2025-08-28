import express from "express";
import Course from "../models/Course.js";

const router = express.Router();

// Add new course (Admin only)
router.post("/add-course", async (req, res) => {
  try {
    const { title, description, fee, duration } = req.body;

    const newCourse = new Course({ title, description, fee, duration });
    await newCourse.save();

    res.json({ msg: "Course added successfully", course: newCourse });
  } catch (err) {
    res.status(500).json({ msg: "Error adding course", error: err.message });
  }
});

// Get all courses (Admin view)
router.get("/all-courses", async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

export default router;
