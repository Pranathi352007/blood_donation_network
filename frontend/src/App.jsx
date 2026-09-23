
import { useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/api/donors";

function App() {
    const [registeredDonor, setRegisteredDonor] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        bloodGroup: "",
        phone: "",
        city: "",
        age: "",
        gender: "",
        address: "",
        lastDonationDate: "",
        available: true
    });

    const [editDonor, setEditDonor] = useState({});

    // Registration form changes
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const type = e.target.type;
        const checked = e.target.checked;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    // Register donor
    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...formData,
                    age: Number(formData.age)
                })
            });

            const data = await response.json();

            if (data.success) {
                setRegisteredDonor(data.donor);

                alert("Donor registered successfully!");

                setFormData({
                    name: "",
                    bloodGroup: "",
                    phone: "",
                    city: "",
                    age: "",
                    gender: "",
                    address: "",
                    lastDonationDate: "",
                    available: true
                });
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert("Unable to connect to backend.");
        }
    };

    // Edit donor
    const handleEdit = () => {
        setEditDonor({
            ...registeredDonor,
            lastDonationDate: registeredDonor.lastDonationDate
                ? registeredDonor.lastDonationDate.substring(0, 10)
                : ""
        });

        setIsEditing(true);
    };

    // Edit form changes
    const handleEditChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const type = e.target.type;
        const checked = e.target.checked;

        setEditDonor({
            ...editDonor,
            [name]: type === "checkbox" ? checked : value
        });
    };

    // Save edited donor
    const handleSave = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                API_URL + "/" + registeredDonor._id,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: editDonor.name,
                        bloodGroup: editDonor.bloodGroup,
                        phone: editDonor.phone,
                        city: editDonor.city,
                        age: Number(editDonor.age),
                        gender: editDonor.gender,
                        address: editDonor.address,
                        lastDonationDate:
                            editDonor.lastDonationDate,
                        available: editDonor.available
                    })
                }
            );

            const data = await response.json();

            if (data.success) {
                setRegisteredDonor(data.donor);
                setIsEditing(false);

                alert("Donor profile updated successfully!");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Update error:", error);
            alert("Unable to update donor profile.");
        }
    };

    // Cancel edit
    const handleCancel = () => {
        setIsEditing(false);
        setEditDonor({});
    };

    // Change availability
const handleAvailability = async () => {
    try {
        const response = await fetch(
            API_URL + "/" + registeredDonor._id
        );

        const data = await response.json();

        if (data.success) {
            const currentDonor = data.donor;

            const newAvailability = !currentDonor.available;

            const updateResponse = await fetch(
                API_URL + "/" + registeredDonor._id,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        available: newAvailability
                    })
                }
            );

            const updateData = await updateResponse.json();

            if (updateData.success) {
                setRegisteredDonor(updateData.donor);

                alert(
                    updateData.donor.available
                        ? "You are now available for blood donation."
                        : "You are now unavailable for blood donation."
                );
            } else {
                alert(updateData.message);
            }
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error("Availability error:", error);
        alert("Unable to update availability.");
    }
};



    return (
        <div className="app">

            <h1>Blood Donation Network</h1>

            {/* ============================= */}
            {/* DONOR REGISTRATION */}
            {/* ============================= */}

            {!registeredDonor && (
                <div className="form-container">

                    <h2>Donor Registration</h2>

                    <form onSubmit={handleRegister}>

                        <label>Name</label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                        />

                        <label>Blood Group</label>

                        <select
                            name="bloodGroup"
                            value={formData.bloodGroup}
                            onChange={handleChange}
                            required
                        >
                            <option value="">
                                Select Blood Group
                            </option>

                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>

                        <label>Phone</label>

                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            required
                        />

                        <label>City</label>

                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="Enter city"
                            required
                        />

                        <label>Age</label>

                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            min="18"
                            max="65"
                            placeholder="Enter age"
                            required
                        />

                        <label>Gender</label>

                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value="">
                                Select Gender
                            </option>

                            <option value="Male">
                                Male
                            </option>

                            <option value="Female">
                                Female
                            </option>

                            <option value="Other">
                                Other
                            </option>
                        </select>

                        <label>Address</label>

                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter address"
                        ></textarea>

                        <label>
                            Last Donation Date
                        </label>

                        <input
                            type="date"
                            name="lastDonationDate"
                            value={
                                formData.lastDonationDate
                            }
                            onChange={handleChange}
                        />

                        <div className="checkbox">

                            <input
                                type="checkbox"
                                name="available"
                                checked={
                                    formData.available
                                }
                                onChange={handleChange}
                            />

                            <label>
                                Available for blood donation
                            </label>

                        </div>

                        <button type="submit">
                            Register Donor
                        </button>

                    </form>

                </div>
            )}

            {/* ============================= */}
            {/* DONOR DASHBOARD */}
            {/* ============================= */}

            {registeredDonor && (
                <div className="dashboard">

                    <h2>Donor Dashboard</h2>

                    {/* ============================= */}
                    {/* EDIT PROFILE */}
                    {/* ============================= */}

                    {isEditing ? (

                        <div className="form-container">

                            <h2>Edit Donor Profile</h2>

                            <form onSubmit={handleSave}>

                                <label>Name</label>

                                <input
                                    type="text"
                                    name="name"
                                    value={
                                        editDonor.name || ""
                                    }
                                    onChange={
                                        handleEditChange
                                    }
                                    required
                                />

                                <label>
                                    Blood Group
                                </label>

                                <select
                                    name="bloodGroup"
                                    value={
                                        editDonor.bloodGroup ||
                                        ""
                                    }
                                    onChange={
                                        handleEditChange
                                    }
                                    required
                                >
                                    <option value="">
                                        Select Blood Group
                                    </option>

                                    <option value="A+">
                                        A+
                                    </option>

                                    <option value="A-">
                                        A-
                                    </option>

                                    <option value="B+">
                                        B+
                                    </option>

                                    <option value="B-">
                                        B-
                                    </option>

                                    <option value="AB+">
                                        AB+
                                    </option>

                                    <option value="AB-">
                                        AB-
                                    </option>

                                    <option value="O+">
                                        O+
                                    </option>

                                    <option value="O-">
                                        O-
                                    </option>
                                </select>

                                <label>Phone</label>

                                <input
                                    type="tel"
                                    name="phone"
                                    value={
                                        editDonor.phone ||
                                        ""
                                    }
                                    onChange={
                                        handleEditChange
                                    }
                                    required
                                />

                                <label>City</label>

                                <input
                                    type="text"
                                    name="city"
                                    value={
                                        editDonor.city || ""
                                    }
                                    onChange={
                                        handleEditChange
                                    }
                                    required
                                />

                                <label>Age</label>

                                <input
                                    type="number"
                                    name="age"
                                    value={
                                        editDonor.age || ""
                                    }
                                    onChange={
                                        handleEditChange
                                    }
                                    min="18"
                                    max="65"
                                    required
                                />

                                <label>Gender</label>

                                <select
                                    name="gender"
                                    value={
                                        editDonor.gender ||
                                        ""
                                    }
                                    onChange={
                                        handleEditChange
                                    }
                                >
                                    <option value="">
                                        Select Gender
                                    </option>

                                    <option value="Male">
                                        Male
                                    </option>

                                    <option value="Female">
                                        Female
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>
                                </select>

                                <label>Address</label>

                                <textarea
                                    name="address"
                                    value={
                                        editDonor.address ||
                                        ""
                                    }
                                    onChange={
                                        handleEditChange
                                    }
                                ></textarea>

                                <label>
                                    Last Donation Date
                                </label>

                                <input
                                    type="date"
                                    name="lastDonationDate"
                                    value={
                                        editDonor.lastDonationDate ||
                                        ""
                                    }
                                    onChange={
                                        handleEditChange
                                    }
                                />

                                <div className="checkbox">

                                    <input
                                        type="checkbox"
                                        name="available"
                                        checked={
                                            editDonor.available ===
                                            true
                                        }
                                        onChange={
                                            handleEditChange
                                        }
                                    />

                                    <label>
                                        Available for blood donation
                                    </label>

                                </div>

                                <button type="submit">
                                    Save Changes
                                </button>

                                <button
                                    type="button"
                                    onClick={
                                        handleCancel
                                    }
                                >
                                    Cancel
                                </button>

                            </form>

                        </div>

                    ) : (

                        <>

                            {/* ============================= */}
                            {/* DONOR DETAILS */}
                            {/* ============================= */}

                            <div className="donor-details">

                                <h3>
                                    Donor Details
                                </h3>

                                <p>
                                    <strong>
                                        Name:
                                    </strong>{" "}
                                    {registeredDonor.name}
                                </p>

                                <p>
                                    <strong>
                                        Blood Group:
                                    </strong>{" "}
                                    {
                                        registeredDonor.bloodGroup
                                    }
                                </p>

                                <p>
                                    <strong>
                                        Phone:
                                    </strong>{" "}
                                    {
                                        registeredDonor.phone
                                    }
                                </p>

                                <p>
                                    <strong>
                                        City:
                                    </strong>{" "}
                                    {registeredDonor.city}
                                </p>

                                <p>
                                    <strong>
                                        Age:
                                    </strong>{" "}
                                    {registeredDonor.age}
                                </p>

                                <p>
                                    <strong>
                                        Gender:
                                    </strong>{" "}
                                    {
                                        registeredDonor.gender ||
                                        "Not specified"
                                    }
                                </p>

                                <p>
                                    <strong>
                                        Address:
                                    </strong>{" "}
                                    {
                                        registeredDonor.address ||
                                        "Not specified"
                                    }
                                </p>

                                <p>
                                    <strong>
                                        Last Donation Date:
                                    </strong>{" "}
                                    {
                                        registeredDonor.lastDonationDate
                                            ? new Date(
                                                  registeredDonor.lastDonationDate
                                              ).toLocaleDateString()
                                            : "Not specified"
                                    }
                                </p>

                                <button
                                    onClick={handleEdit}
                                >
                                    Edit Profile
                                </button>

                            </div>

                            {/* ============================= */}
                            {/* AVAILABILITY */}
                            {/* ============================= */}

                            <div className="availability">

                                <h3>
                                    Donor Availability
                                </h3>

                                <p>
                                    <strong>
                                        Status:
                                    </strong>{" "}

                                    {registeredDonor.available ===
                                    true
                                        ? "🟢 Available for Donation"
                                        : "🔴 Not Available for Donation"}
                                </p>

                                <button
                                    onClick={
                                        handleAvailability
                                    }
                                >
                                    {registeredDonor.available ===
                                    true
                                        ? "Set as Not Available"
                                        : "Set as Available"}
                                </button>

                            </div>

                        </>

                    )}

                </div>
            )}

        </div>
    );
}

export default App;

