const Hospital = require("../models/Hospital");
const User = require("../models/User");

const saveHospitalAvailability = async (req, res) => {
  try {
    const { name, city, address, phone, bloodInventory } = req.body;

    if (!city) {
      return res.status(400).json({ success: false, message: "City is required" });
    }

    if (!bloodInventory || typeof bloodInventory !== "object" || Array.isArray(bloodInventory)) {
      return res.status(400).json({ success: false, message: "Blood inventory is required" });
    }

    const validGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    const cleanedInventory = {};

    for (const group of validGroups) {
      if (bloodInventory[group] !== undefined && bloodInventory[group] !== "") {
        const units = Number(bloodInventory[group]);
        if (!Number.isInteger(units) || units < 0) {
          return res.status(400).json({ success: false, message: `Invalid units for ${group}` });
        }
        cleanedInventory[group] = units;
      }
    }

    const availableBloodGroups = Object.keys(cleanedInventory).filter(
      (group) => cleanedInventory[group] > 0
    );

    const user = await User.findById(req.user.userId).select("name phone city role");
    if (!user || user.role !== "hospital") {
      return res.status(403).json({ success: false, message: "Hospital account not found" });
    }

    const hospital = await Hospital.findOneAndUpdate(
      { userId: req.user.userId },
      {
        userId: req.user.userId,
        name: (name || user.name).trim(),
        city: city.trim(),
        address: (address || "").trim(),
        phone: (phone || user.phone || "").trim(),
        availableBloodGroups,
        bloodInventory: cleanedInventory,
      },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({
      success: true,
      message: "Hospital blood availability saved successfully",
      hospital,
    });
  } catch (error) {
    console.error("Save hospital availability error:", error);
    res.status(500).json({ success: false, message: "Unable to save hospital availability" });
  }
};

const getMyHospitalAvailability = async (req, res) => {
  try {
    const hospital = await Hospital.findOne({ userId: req.user.userId });
    res.status(200).json({ success: true, hospital: hospital || null });
  } catch (error) {
    console.error("Get hospital availability error:", error);
    res.status(500).json({ success: false, message: "Unable to load hospital availability" });
  }
};

module.exports = { saveHospitalAvailability, getMyHospitalAvailability };
