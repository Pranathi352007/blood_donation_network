
// Dummy donor data for testing
const donors = [
    {
        name: "Ravi",
        bloodGroup: "O+",
        city: "Bhimavaram",
        phone: "9876543210",
        available: true
    },
    {
        name: "Priya",
        bloodGroup: "A+",
        city: "Vijayawada",
        phone: "9876543211",
        available: true
    },
    {
        name: "Kiran",
        bloodGroup: "O+",
        city: "Bhimavaram",
        phone: "9876543212",
        available: false
    },
    {
        name: "Anjali",
        bloodGroup: "B+",
        city: "Hyderabad",
        phone: "9876543213",
        available: true
    }
];

// Search donors
const searchDonors = (req, res) => {

    const { bloodGroup, city } = req.query;

    const matchingDonors = donors.filter((donor) => {

        const bloodMatch =
            !bloodGroup ||
            donor.bloodGroup.toLowerCase() === bloodGroup.toLowerCase();

        const cityMatch =
            !city ||
            donor.city.toLowerCase() === city.toLowerCase();

        return bloodMatch && cityMatch && donor.available === true;
    });

    res.json({
        success: true,
        count: matchingDonors.length,
        donors: matchingDonors
    });
};

module.exports = {
    searchDonors
};