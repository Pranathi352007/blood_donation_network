const mongoose = require("mongoose");
const Hospital = require("../models/Hospital");
require("dotenv").config();

const hospitals = [
  {
    name: "City Care Hospital",
    city: "Hyderabad",
    address: "Hyderabad",
    phone: "9000000001",
    availableBloodGroups: ["O+", "A+", "B+"],
    bloodInventory: { "O+": 8, "A+": 4, "B+": 3 },
  },
  {
    name: "LifeLine Hospital",
    city: "Krishna",
    address: "Krishna",
    phone: "9000000002",
    availableBloodGroups: ["B+", "O-"],
    bloodInventory: { "B+": 5, "O-": 2 },
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Hospital.deleteMany({});
    await Hospital.insertMany(hospitals);
    console.log("Hospital sample data inserted successfully");
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
