const express = require("express");
const router = express.Router();

router.post("/signup", (req, res) => {
  res.send("Signup route working 🚀");
});

router.post("/login", (req, res) => {
  res.send("Login route working 🚀");
});

module.exports = router;
