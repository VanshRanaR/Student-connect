import { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function Meeting() {
  const { mentorId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const sendRequest = async () => {
    if (!date || !time || !message) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/meetings/request", {
        student: user._id,
        mentor: mentorId,
        message,
        date,
        time
      });

      alert("Meeting request sent ");
      setMessage("");
      setDate("");
      setTime("");
    } catch (err) {
      console.log(err);
      alert("Error sending meeting request");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "16px",
          width: "400px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.08)"
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Book Meeting</h2>

        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          style={inputStyle}
        />

        <label>Time</label>
        <input
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
          style={inputStyle}
        />

        <label>Reason</label>
        <textarea
          placeholder="Reason for meeting"
          value={message}
          onChange={e => setMessage(e.target.value)}
          style={{ ...inputStyle, height: "80px" }}
        />

        <button onClick={sendRequest} style={buttonStyle}>
          Send Request
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "8px 0 18px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  outline: "none",
  fontSize: "14px"
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  background: "#6c63ff",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "0.3s"
};

export default Meeting;
