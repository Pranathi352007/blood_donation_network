const express = require("express");

const {
  createDonor,
  getDonors,
  getDonorById,
  updateDonor,
  deleteDonor
} = require("../controllers/donorController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

// Donor profiles can be viewed publicly for donor discovery.
router.get("/", getDonors);
router.get("/:id", getDonorById);

// Only authenticated donor accounts can create or modify donor profiles.
router.post("/", protect, authorizeRoles("donor"), createDonor);
router.put("/:id", protect, authorizeRoles("donor"), updateDonor);
router.delete("/:id", protect, authorizeRoles("donor"), deleteDonor);

module.exports = router;