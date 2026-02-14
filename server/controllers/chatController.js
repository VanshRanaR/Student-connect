const Message = require("../models/Message");

// Send message
exports.sendMessage = async (req, res) => {
  try {
    const { sender, receiver, text } = req.body;

    const msg = await Message.create({
      sender,
      receiver,
      text
    });

    res.json(msg);

  } catch (err) {
    res.status(500).json(err.message);
  }
};

// Get chat history
exports.getMessages = async (req, res) => {
  try {
    const { user1, user2 } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 }
      ]
    }).sort({ createdAt: 1 });

    res.json(messages);

  } catch (err) {
    res.status(500).json(err.message);
  }
};
