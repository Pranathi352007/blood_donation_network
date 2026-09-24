const express = require("express");

const {
  createDonation,
  getDonationsByDonor,
  getDonationsByHospital
} = require("../controllers/donationController");

const router = express.Router();

router.post("/", createDonation);

router.get("/donor/:donorId", getDonationsByDonor);

router.get("/hospital/:hospitalId", getDonationsByHospital);

module.exports = router;