const router = require("express").Router();
const chat = require("../controllers/chatController");

router.post("/send", chat.sendMessage);
router.get("/:user1/:user2", chat.getMessages);

module.exports = router;
