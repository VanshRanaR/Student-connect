import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Seniors.css";

function Seniors() {
  const [seniors, setSeniors] = useState([]);

  useEffect(() => {
    API.get("/users/seniors")
      .then(res => {
        console.log(res.data);
        setSeniors(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="mentor-container">
      <h1 className="mentor-title">Our Mentors 🚀</h1>

      <div className="mentor-grid">
        {seniors.map(senior => (
          <div key={senior._id} className="mentor-card">

            <img
              className="mentor-photo"
              src={
                senior.photo
                  ? senior.photo.startsWith("http")
                    ? senior.photo
                    : `http://localhost:5000/uploads/${senior.photo}`
                  : "https://via.placeholder.com/150"
              }
              alt="mentor"
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/150")
              }
            />

            <h3>{senior.name}</h3>

            <p>🏢 {senior.company}</p>
            <p>💰 {senior.package}</p>
            <p>🎓 {senior.batch}</p>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Seniors;
