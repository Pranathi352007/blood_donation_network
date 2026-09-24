const Hospital = require("../models/Hospital");

const searchHospitals = async (req, res) => {
  try {
    const { bloodGroup, city } = req.query;
    const filter = {};

    if (bloodGroup) {
      filter.availableBloodGroups = bloodGroup.trim();
    }

    if (city) {
      filter.city = { $regex: city.trim(), $options: "i" };
    }

    const hospitals = await Hospital.find(filter)
      .select("name city address phone availableBloodGroups bloodInventory")
      .sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: hospitals.length,
      hospitals,
    });
  } catch (error) {
    console.error("Hospital search error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to search hospitals",
    });
  }
};

module.exports = { searchHospitals };
