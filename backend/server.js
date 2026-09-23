const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const donorRoutes = require("./routes/donorRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/donors", donorRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Blood Donation Network Backend is running"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});