import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import socket from "../socket";
import { getUser } from "../utils/auth";
import "../styles/Chat.css";

function Chat() {
  const { mentorId } = useParams();
  const user = getUser();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // socket connect
  useEffect(() => {
    socket.connect();
    socket.emit("join", user._id);
    return () => socket.disconnect();
  }, []);

  // realtime receive
  useEffect(() => {
    socket.on("receiveMessage", msg => {
      setMessages(prev => [...prev, msg]);
    });
    return () => socket.off("receiveMessage");
  }, []);

  // load old messages
  useEffect(() => {
    API.get(`/chat/messages/${mentorId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => setMessages(res.data))
      .catch(console.log);
  }, [mentorId]);

  const sendMessage = async e => {
    e.preventDefault();
    if (!text.trim()) return;

    const res = await API.post(
      "/chat/send",
      { receiver: mentorId, text },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );

    socket.emit("sendMessage", res.data);
    setMessages(prev => [...prev, res.data]);
    setText("");
  };

  return (
    <div className="chat-page">

      <div className="chat-messages">
        {messages.map(m => (
          <p
            key={m._id}
            className={
              m.sender === user._id ? "msg sent" : "msg received"
            }
          >
            {m.text}
          </p>
        ))}
      </div>

      <form onSubmit={sendMessage} className="chat-input-area">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Type a message..."
        />
        <button>Send</button>
      </form>

    </div>
  );
}

export default Chat;
