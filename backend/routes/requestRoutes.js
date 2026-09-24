const express = require("express");

const {
    createRequest,
    getRequests,
    getRequestById,
    updateRequest,
    cancelRequest
} = require("../controllers/requestController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Create a blood request
router.post("/", protect, createRequest);

// Get all blood requests
router.get("/", protect, getRequests);

// Get a specific blood request
router.get("/:id", protect, getRequestById);

// Update a blood request
router.put("/:id", protect, updateRequest);

// Cancel a blood request
router.patch("/:id/cancel", protect, cancelRequest);

module.exports = router;
