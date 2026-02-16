import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { getUser } from "../utils/auth";
import "../styles/Chat.css";

function Chat() {
  const { mentorId } = useParams();
  const user = getUser();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // FETCH CHAT
  useEffect(() => {
    if (!mentorId) return;

    API.get(`/chat/${mentorId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => setMessages(res.data))
      .catch(err => console.log(err));
  }, [mentorId]);

  // SEND MESSAGE
  const sendMessage = async e => {
    e.preventDefault();

    if (!text.trim()) return;

    try {
      const res = await API.post(
        "/chat/send",
        {
          receiver: mentorId,
          text
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setMessages(prev => [...prev, res.data]);
      setText("");

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chat-wrapper">

      {/* Header */}
      <div className="chat-header">
        Chat
      </div>

      {/* Messages */}
      <div className="chat-body">
        {messages.length === 0 && (
          <p className="no-msg">No messages yet</p>
        )}

        {messages.map(msg => (
          <div
            key={msg._id}
            className={
              msg.sender === user._id
                ? "chat-bubble sent"
                : "chat-bubble received"
            }
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <form className="chat-footer" onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type message..."
          value={text}
          onChange={e => setText(e.target.value)}
        />

        <button type="submit">
          Send
        </button>
      </form>

    </div>
  );
}

export default Chat;
