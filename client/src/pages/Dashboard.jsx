import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Dashboard.css";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [chats, setChats] = useState([]);

  // FETCH CHAT CONTACTS
  useEffect(() => {
    API.get("/chat/inbox", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => setChats(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="dashboard">

      <h1>Dashboard</h1>

      {/* Profile */}
      <div className="profile-card">
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>{user.role}</p>
      </div>

      {/* CHAT INBOX */}
      <div className="chat-inbox">
        <h2>Messages</h2>

        {chats.length === 0 && (
          <p>No conversations yet</p>
        )}

        {chats.map(chat => (
          <div
            key={chat._id}
            className="chat-preview"
            onClick={() => navigate(`/chat/${chat.userId}`)}
          >
            <img
              src={
                chat.photo
                  ? chat.photo.startsWith("http")
                    ? chat.photo
                    : `http://localhost:5000/uploads/${chat.photo}`
                  : "https://via.placeholder.com/50"
              }
              alt="profile"
            />

            <div>
              <h4>{chat.name}</h4>
              <p>{chat.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Dashboard;
