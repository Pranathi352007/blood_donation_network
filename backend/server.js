const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const donorRoutes = require("./routes/donorRoutes");
const donorSearchRoutes = require("./routes/donorSearch");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// Member 1: authentication routes
app.use("/api/auth", authRoutes);

// Member 4: donor search must be registered before /:id in donorRoutes
// so GET /api/donors/search is not interpreted as a donor ID.
app.use("/api/donors", donorSearchRoutes);

// Member 2: donor CRUD routes
app.use("/api/donors", donorRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Blood Donation Network API is running"
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
