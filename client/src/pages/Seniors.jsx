import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Seniors.css";

function Seniors() {
  const [seniors, setSeniors] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/users/seniors")
      .then(res => setSeniors(res.data))
      .catch(err => console.log(err));
  }, []);

  // Filter mentors by name
  const filteredSeniors = seniors.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mentor-container">

      {/* HERO SECTION */}
      <div className="mentor-hero">
        <h1>Find Your Perfect Mentor </h1>
        <p>
          Connect with seniors for guidance, placements
          and career growth.
        </p>

        <input
          className="mentor-search"
          placeholder="Search mentor by name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* GRID */}
      <div className="mentor-grid">
        {filteredSeniors.map(senior => (
          <div key={senior._id} className="mentor-card">

            <div className="mentor-photo-wrapper">
              <img
                className="mentor-photo"
                src={
                  senior.photo
                    ? senior.photo.startsWith("http")
                      ? senior.photo
                      : `http://localhost:5000/uploads/${senior.photo}`
                    : "/default-avatar.png"
                }
                alt={senior.name}
              />
            </div>

            <h3>{senior.name}</h3>
            <p>{senior.company}</p>
            <p>{senior.package}</p>
            <p>Batch {senior.batch}</p>

            <div className="mentor-buttons">
              <button onClick={() => navigate(`/chat/${senior._id}`)}>
                Chat
              </button>

              <button onClick={() => navigate(`/meeting/${senior._id}`)}>
                Book Meeting
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Seniors;
