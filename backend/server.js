const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Donor search route
const donorSearchRoutes = require("./routes/donorSearch");

app.use("/api/donors", donorSearchRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Blood Donation Network API is running");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});