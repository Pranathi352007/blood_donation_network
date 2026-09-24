const express = require("express");
const { searchHospitals } = require("../controllers/hospitalSearchController");

const router = express.Router();

router.get("/search", searchHospitals);

module.exports = router;
