const express = require("express");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const User = require("../models/User");

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

// Get all registered students
router.get("/students", async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate("userId", "name email")
      .populate("courseId", "title");

    const students = enrollments.map(e => ({
      _id: e._id,
      name: e.userId.name,
      email: e.userId.email,
      courseTitle: e.courseId.title,
      paymentStatus: e.paymentStatus,
    }));

    res.json(students);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching students", error: err.message });
  }
});

// Update course
router.put("/update-course/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, fee, duration } = req.body;
  try {
    const course = await Course.findById(id);
    course.title = title;
    course.description = description;
    course.fee = fee;
    course.duration = duration;
    await course.save();
    res.json({ msg: "Course updated successfully", course });
  } catch (err) {
    res.status(500).json({ msg: "Error updating course", error: err.message });
  }
});

// Delete course
router.delete("/delete-course/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Course.findByIdAndDelete(id);
    res.json({ msg: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting course", error: err.message });
  }
});


module.exports = router;