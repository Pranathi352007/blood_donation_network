const Donor = require("../models/Donor");

// Create donor
const createDonor = async (req, res) => {
    try {
        const donor = await Donor.create(req.body);

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
        const donors = await Donor.find();

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
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update donor
const updateDonor = async (req, res) => {
    try {
        const donor = await Donor.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!donor) {
            return res.status(404).json({
                success: false,
                message: "Donor not found"
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

// Delete donor
const deleteDonor = async (req, res) => {
    try {
        const donor = await Donor.findByIdAndDelete(req.params.id);

        if (!donor) {
            return res.status(404).json({
                success: false,
                message: "Donor not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Donor deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
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