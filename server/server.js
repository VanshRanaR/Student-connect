
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected 👍"))
.catch(err=>console.log(err));
app.get("/", (req,res)=>{
  res.send("Backend working 👍");
});
// const helmet = require("helmet");

// app.use(
//   helmet({
//     crossOriginResourcePolicy: false
//   })
// );


const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});
// const mongoSanitize = require("express-mongo-sanitize");
// app.use(mongoSanitize());


app.use(limiter);


const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);
app.use(
  "/uploads",
  cors(),
  express.static("uploads")
);

// const xss = require("xss-clean");
// app.use(xss());
const hpp = require("hpp");
app.use(hpp());

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);
const chatRoutes = require("./routes/chatRoutes");
app.use("/api/chat", chatRoutes);

const meetingRoutes = require("./routes/meetingRoutes");
app.use("/api/meetings", meetingRoutes);

const PORT = 5000;
app.listen(PORT, ()=>{
  console.log("Server running on port 5000");
});
