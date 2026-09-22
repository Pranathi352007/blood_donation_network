const express = require("express");

const {
  registerUser,
  loginUser,
  getMe
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Register user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Get logged-in user's profile - Protected route
router.get("/me", protect, getMe);

module.exports = router;