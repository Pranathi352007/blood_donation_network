const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        bloodGroup: {
            type: String,
            required: true,
            enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
        },

        phone: {
            type: String,
            required: true,
            trim: true
        },

        city: {
            type: String,
            required: true,
            trim: true
        },

        age: {
            type: Number,
            required: true,
            min: 18,
            max: 65
        },

        gender: {
            type: String,
            enum: ["Male", "Female", "Other"]
        },

        address: {
            type: String,
            trim: true
        },

        lastDonationDate: {
            type: Date
        },

        available: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Donor", donorSchema);