const Donation = require("../models/Donation");


// CREATE DONATION
const createDonation = async (req, res) => {
  try {
    const donation = await Donation.create(req.body);

    res.status(201).json({
      success: true,
      message: "Donation recorded successfully",
      data: donation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// GET DONATIONS OF A DONOR
const getDonationsByDonor = async (req, res) => {
  try {
    const donations = await Donation.find({
      donorId: req.params.donorId
    })
      .populate("hospitalId", "hospitalName city");

    res.status(200).json({
      success: true,
      data: donations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// GET DONATIONS OF A HOSPITAL
const getDonationsByHospital = async (req, res) => {
  try {
    const donations = await Donation.find({
      hospitalId: req.params.hospitalId
    })
      .populate("donorId");

    res.status(200).json({
      success: true,
      data: donations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


module.exports = {
  createDonation,
  getDonationsByDonor,
  getDonationsByHospital
};