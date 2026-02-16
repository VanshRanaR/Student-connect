const router = require("express").Router();
const chat = require("../controllers/chatController");
const auth = require("../middleware/auth");

// Send message
router.post("/send", auth, chat.sendMessage);

// Get chat between two users
router.get("/:user2", auth, chat.getMessages);

// Dashboard chat list
router.get("/my-chats", auth, chat.getMyChats);

module.exports = router;
