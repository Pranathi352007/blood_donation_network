const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      sparse: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
      default: "",
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    availableBloodGroups: {
      type: [String],
      default: [],
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    bloodInventory: {
      type: Map,
      of: {
        type: Number,
        min: 0,
      },
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hospital", hospitalSchema);
