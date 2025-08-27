const express = require("express");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const router = express.Router();

// ✅ Get all courses
router.get("/", async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// ✅ Enroll a course
router.post("/enroll", async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    // check if already enrolled
    const existing = await Enrollment.findOne({ userId, courseId });
    if (existing) return res.status(400).json({ msg: "Already enrolled" });

    const enroll = new Enrollment({ userId, courseId, paymentStatus: "pending" });
    await enroll.save();

    res.json({ msg: "Enrolled successfully 🚀", enroll });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ✅ Get my enrollments
router.get("/my/:userId", async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ userId: req.params.userId })
      .populate("courseId", "title fee duration");
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
