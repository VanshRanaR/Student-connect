import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Seniors.css";

function Seniors() {
  const [seniors, setSeniors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/users/seniors")
      .then(res => setSeniors(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="mentor-container">
      <h1 className="mentor-title">Our Mentors</h1>

      <div className="mentor-grid">
        {seniors.map(senior => (
          <div
            key={senior._id}
            className="mentor-card"
            onClick={() => navigate(`/chat/${senior._id}`)}
          >
            <img
              className="mentor-photo"
              src={
                senior.photo
                  ? senior.photo.startsWith("http")
                    ? senior.photo
                    : `http://localhost:5000/uploads/${senior.photo}`
                  : "https://via.placeholder.com/150"
              }
              alt={senior.name}
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/150")
              }
            />

            <h3 className="mentor-name">{senior.name}</h3>

            <p className="mentor-info">{senior.company}</p>
            <p className="mentor-info">{senior.package}</p>
            <p className="mentor-info">Batch {senior.batch}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Seniors;
