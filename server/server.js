const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

require("dotenv").config();

const app = express();
const server = http.createServer(app);

// SOCKET.IO SETUP
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true
  }
});

// SOCKET CONNECTION
io.on("connection", socket => {
  console.log("User Connected:", socket.id);

  // Join room using userId
  socket.on("join", userId => {
    socket.join(userId);
  });

  // Send message realtime
  socket.on("sendMessage", msg => {
    io.to(msg.receiver).emit("receiveMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});


// CORS
app.use(cors());


app.use(express.json());


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected 👍"))
  .catch(err => console.log(err));


// Rate limit login/signup
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use("/api/auth", limiter);


// Static uploads
;


// Routes
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const chatRoutes = require("./routes/chatRoutes");
app.use("/api/chat", chatRoutes);

const meetingRoutes = require("./routes/meetingRoutes");
app.use("/api/meetings", meetingRoutes);
const uploadRoutes = require("./routes/uploadRoutes");

app.use("/api/upload", uploadRoutes);


// Server start
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
