import { useEffect, useState } from "react";
import API from "../services/api";

function Meetings() {
  const [meetings, setMeetings] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    API.get(`/meetings/${user._id}`)
      .then(res => setMeetings(res.data))
      .catch(err => console.log(err));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.patch(`/meetings/${id}`, { status });

      setMeetings(prev =>
        prev.map(m => (m._id === id ? { ...m, status } : m))
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "40px", background: "#f5f6fa", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: "25px" }}>My Meetings</h1>

      {meetings.length === 0 ? (
        <p>No meetings yet</p>
      ) : (
        meetings.map(m => (
          <div
            key={m._id}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              marginBottom: "20px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
            }}
          >
            <p><b>Message:</b> {m.message}</p>
            <p><b>Date:</b> {m.date}</p>
            <p><b>Time:</b> {m.time}</p>

            <p>
              <b>Status:</b>{" "}
              <span
                style={{
                  color:
                    m.status === "approved"
                      ? "green"
                      : m.status === "rejected"
                      ? "red"
                      : "orange",
                  fontWeight: "bold"
                }}
              >
                {m.status}
              </span>
            </p>

            {/* Mentor approve/reject */}
            {user._id === m.mentor && m.status === "pending" && (
              <div style={{ marginTop: "10px" }}>
                <button
                  onClick={() => updateStatus(m._id, "approved")}
                  style={{
                    marginRight: "10px",
                    padding: "8px 16px",
                    border: "none",
                    borderRadius: "6px",
                    background: "green",
                    color: "#fff",
                    cursor: "pointer"
                  }}
                >
                  Approve
                </button>

                <button
                  onClick={() => updateStatus(m._id, "rejected")}
                  style={{
                    padding: "8px 16px",
                    border: "none",
                    borderRadius: "6px",
                    background: "red",
                    color: "#fff",
                    cursor: "pointer"
                  }}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Meetings;
