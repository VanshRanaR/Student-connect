const router = require("express").Router();
const chat = require("../controllers/chatController");
const auth = require("../middleware/auth");

// Send message
router.post("/send", auth, chat.sendMessage);

// Dashboard inbox
router.get("/inbox", auth, chat.getMyChats);

// Chat messages between two users
router.get("/messages/:user2", auth, chat.getMessages);

module.exports = router;
