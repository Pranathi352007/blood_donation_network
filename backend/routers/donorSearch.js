
const express = require("express");
const router = express.Router();

const { searchDonors } = require("../controllers/donorSearchController");

// GET /api/donors/search
router.get("/search", searchDonors);

module.exports = router;