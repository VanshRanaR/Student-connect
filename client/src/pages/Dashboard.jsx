import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import socket from "../socket";
import "../styles/Dashboard.css";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);

  // JOIN SOCKET ROOM
  useEffect(() => {
    if (!user?._id) return;

    socket.connect();
    socket.emit("join", user._id);

    return () => socket.disconnect();
  }, [user]);

  // FETCH INBOX
  const fetchInbox = () => {
    API.get("/chat/inbox", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => setChats(res.data))
      .catch(console.log);
  };

  useEffect(() => {
    fetchInbox();
  }, []);

  // REALTIME UPDATE
  useEffect(() => {
    socket.on("receiveMessage", fetchInbox);

    return () => socket.off("receiveMessage");
  }, []);

  return (
    <div className="dashboard">

      

      {/* Profile */}
      <div className="profile-card">
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
        <span className="role">{user?.role}</span>
      </div>

      {/* Chat Inbox */}
      <div className="chat-inbox">
        <h2>Messages</h2>

        {chats.length === 0 && (
          <p className="no-chat">No conversations yet</p>
        )}

        {chats.map(chat => (
          <div
            key={chat.userId}
            className="chat-preview"
            onClick={() => navigate(`/chat/${chat.userId}`)}
          >
            <img
              className="chat-avatar"
              src={
                chat.photo
                  ? chat.photo.startsWith("http")
                    ? chat.photo
                    : `http://localhost:5000/uploads/${chat.photo}`
                  : "https://via.placeholder.com/50"
              }
              alt="profile"
            />

            <div className="chat-info">
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
