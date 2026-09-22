
const express = require("express");
const router = express.Router();

const { searchDonors } = require("../controllers/donorSearchController");

router.get("/search", searchDonors);

module.exports = router;