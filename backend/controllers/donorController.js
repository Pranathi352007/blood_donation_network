const Donor = require("../models/Donor");

// Create donor profile for the logged-in donor
const createDonor = async (req, res) => {
  try {
    const existingDonor = await Donor.findOne({ userId: req.user.userId });

    if (existingDonor) {
      return res.status(409).json({
        success: false,
        message: "Donor profile already exists for this user"
      });
    }

    const donor = await Donor.create({
      ...req.body,
      userId: req.user.userId
    });

    res.status(201).json({
      success: true,
      message: "Donor created successfully",
      donor
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get all donors
const getDonors = async (req, res) => {
  try {
    const donors = await Donor.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: donors.length,
      donors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get donor by ID
const getDonorById = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);

    if (!donor) {
      return res.status(404).json({
        success: false,
        message: "Donor not found"
      });
    }

    res.status(200).json({
      success: true,
      donor
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid donor ID"
    });
  }
};

// Update only the logged-in donor's profile
const updateDonor = async (req, res) => {
  try {
    const donor = await Donor.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { $set: req.body },
      {
        new: true,
        runValidators: true
      }
    );

    if (!donor) {
      return res.status(404).json({
        success: false,
        message: "Donor not found or access denied"
      });
    }

    res.status(200).json({
      success: true,
      message: "Donor updated successfully",
      donor
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete only the logged-in donor's profile
const deleteDonor = async (req, res) => {
  try {
    const donor = await Donor.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!donor) {
      return res.status(404).json({
        success: false,
        message: "Donor not found or access denied"
      });
    }

    res.status(200).json({
      success: true,
      message: "Donor deleted successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid donor ID"
    });
  }
};

module.exports = {
  createDonor,
  getDonors,
  getDonorById,
  updateDonor,
  deleteDonor
};