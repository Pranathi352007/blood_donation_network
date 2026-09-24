import { useState } from "react";

const API_BASE_URL = "http://localhost:5001";

function SearchDonor() {
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");
  const [donors, setDonors] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const searchDonors = async () => {
    setLoading(true);
    setMessage("");

    try {
      const params = new URLSearchParams();

      if (bloodGroup) params.set("bloodGroup", bloodGroup);
      if (city.trim()) params.set("city", city.trim());

      const response = await fetch(
        `${API_BASE_URL}/api/donors/search?${params.toString()}`
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Search failed");
      }

      setDonors(data.donors || []);
      setMessage(
        data.donors?.length
          ? `${data.donors.length} donor(s) found.`
          : "No matching donors found."
      );
    } catch (error) {
      setDonors([]);
      setMessage("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Blood Donor Search</h1>

      <div>
        <label htmlFor="bloodGroup">Blood Group: </label>
        <select
          id="bloodGroup"
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
        >
          <option value="">All Blood Groups</option>
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
        <label htmlFor="city">City: </label>
        <input
          id="city"
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <br />

      <button onClick={searchDonors} disabled={loading}>
        {loading ? "Searching..." : "Search Donors"}
      </button>

      <h3>{message}</h3>

      {donors.map((donor) => (
        <div
          key={donor._id || `${donor.name}-${donor.phone}`}
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
          <p>Available: {donor.available ? "Yes" : "No"}</p>
        </div>
      ))}
    </div>
  );
}

export default SearchDonor;
