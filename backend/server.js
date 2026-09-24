const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const donorRoutes = require("./routes/donorRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/donors", donorRoutes);

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Blood Donation Network API is running"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});