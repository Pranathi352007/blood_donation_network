const express = require("express");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const {
  saveHospitalAvailability,
  getMyHospitalAvailability,
} = require("../controllers/hospitalController");

const router = express.Router();

router.get("/me", protect, authorizeRoles("hospital"), getMyHospitalAvailability);
router.post("/availability", protect, authorizeRoles("hospital"), saveHospitalAvailability);

module.exports = router;
