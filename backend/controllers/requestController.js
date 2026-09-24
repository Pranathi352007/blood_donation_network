const BloodRequest = require("../models/BloodRequest");

// Create a blood request
const createRequest = async (req, res) => {
    try {
        const request = await BloodRequest.create({
            ...req.body,
            requesterId: req.user.userId
        });

        res.status(201).json({
            success: true,
            message: "Blood request created successfully",
            request
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get all blood requests
const getRequests = async (req, res) => {
    try {
        const requests = await BloodRequest.find()
            .populate("requesterId", "name email phone city role")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: requests.length,
            requests
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get a single blood request
const getRequestById = async (req, res) => {
    try {
        const request = await BloodRequest.findById(req.params.id)
            .populate("requesterId", "name email phone city role");

        if (!request) {
            return res.status(404).json({
                success: false,
                message: "Blood request not found"
            });
        }

        res.status(200).json({
            success: true,
            request
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update a blood request
const updateRequest = async (req, res) => {
    try {
        const request = await BloodRequest.findById(req.params.id);

        if (!request) {
            return res.status(404).json({
                success: false,
                message: "Blood request not found"
            });
        }

        if (request.requesterId.toString() !== req.user.userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You can only update your own blood requests"
            });
        }

        Object.assign(request, req.body);
        await request.save();

        res.status(200).json({
            success: true,
            message: "Blood request updated successfully",
            request
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Cancel a blood request
const cancelRequest = async (req, res) => {
    try {
        const request = await BloodRequest.findById(req.params.id);

        if (!request) {
            return res.status(404).json({
                success: false,
                message: "Blood request not found"
            });
        }

        if (request.requesterId.toString() !== req.user.userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You can only cancel your own blood requests"
            });
        }

        request.status = "Cancelled";
        await request.save();

        res.status(200).json({
            success: true,
            message: "Blood request cancelled successfully",
            request
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createRequest,
    getRequests,
    getRequestById,
    updateRequest,
    cancelRequest
};
