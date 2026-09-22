
import { useState } from "react";

function SearchDonor() {
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");
  const [donors, setDonors] = useState([]);
  const [message, setMessage] = useState("");

  const searchDonors = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/donors/search?bloodGroup=${encodeURIComponent(
          bloodGroup
        )}&city=${encodeURIComponent(city)}`
      );

      const data = await response.json();

      setDonors(data.donors);

      if (data.donors.length === 0) {
        setMessage("No matching donors found.");
      } else {
        setMessage(`${data.donors.length} donor(s) found.`);
      }
    } catch (error) {
      setMessage("Unable to connect to the server.");
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Blood Donor Search</h1>

      <div>
        <label>Blood Group: </label>

        <select
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
        >
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
      </div>

      <br />

      <div>
        <label>City: </label>

        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <br />

      <button onClick={searchDonors}>Search Donors</button>

      <h3>{message}</h3>

      {donors.map((donor, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginTop: "10px",
            width: "300px",
          }}
        >
          <h3>{donor.name}</h3>
          <p>Blood Group: {donor.bloodGroup}</p>
          <p>City: {donor.city}</p>
          <p>Phone: {donor.phone}</p>
          <p>Available: Yes</p>
        </div>
      ))}
    </div>
  );
}

export default SearchDonor;
