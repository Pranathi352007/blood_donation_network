const Donor = require("../models/Donor");

const escapeRegex = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Search available donors stored in MongoDB.
const searchDonors = async (req, res) => {
  try {
    const { bloodGroup, city } = req.query;

    const filter = {
      available: true
    };

    if (bloodGroup) {
      filter.bloodGroup = bloodGroup.trim().toUpperCase();
    }

    if (city && city.trim()) {
      filter.city = new RegExp(`^${escapeRegex(city.trim())}$`, "i");
    }

    const matchingDonors = await Donor.find(filter).select(
      "name bloodGroup city phone available"
    );

    res.json({
      success: true,
      count: matchingDonors.length,
      donors: matchingDonors
    });
  } catch (error) {
    console.error("Donor search error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to search donors"
    });
  }
};

module.exports = {
  searchDonors
};
