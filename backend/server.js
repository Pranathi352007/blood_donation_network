const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const donorRoutes = require("./routes/donorRoutes");
const donorSearchRoutes = require("./routes/donorSearch");
const hospitalSearchRoutes = require("./routes/hospitalSearchRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// Routes
app.use("/api/auth", authRoutes);
// Register specific search routes before generic /:id donor routes.
app.use("/api/donors", donorSearchRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/hospitals", hospitalSearchRoutes);

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
