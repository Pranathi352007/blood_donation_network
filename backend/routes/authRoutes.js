const express = require("express");

const {
  registerUser,
  loginUser,
  getMe
} = require("../controllers/authController");

const {
  protect,
  authorizeRoles
} = require("../middleware/authMiddleware");

const router = express.Router();

// Register user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Get logged-in user's profile
router.get("/me", protect, getMe);

// Test route - Donor only
router.get(
  "/donor-only",
  protect,
  authorizeRoles("donor"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Donor! You are authorized to access this route."
    });
  }
);

module.exports = router;