const Message = require("../models/Message");

// SEND MESSAGE
exports.sendMessage = async (req, res) => {
  try {
    const sender = req.user.id;
    const { receiver, text } = req.body;

    if (!receiver || !text) {
      return res.status(400).json({
        message: "Receiver and text required"
      });
    }

    const msg = await Message.create({
      sender,
      receiver,
      text
    });

    res.status(201).json(msg);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};


// GET CHAT BETWEEN TWO USERS
exports.getMessages = async (req, res) => {
  try {
    const user1 = req.user.id;
    const { user2 } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 }
      ]
    }).sort({ createdAt: 1 });

    res.json(messages);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};


// DASHBOARD INBOX
exports.getMyChats = async (req, res) => {
  try {
    const userId = req.user.id;

    const messages = await Message.find({
      $or: [
        { sender: userId },
        { receiver: userId }
      ]
    })
      .populate("sender", "name photo")
      .populate("receiver", "name photo")
      .sort({ createdAt: -1 });

    const inbox = {};

    messages.forEach(msg => {
      const otherUser =
        msg.sender._id.toString() === userId
          ? msg.receiver
          : msg.sender;

      if (!inbox[otherUser._id]) {
        inbox[otherUser._id] = {
          userId: otherUser._id,
          name: otherUser.name,
          photo: otherUser.photo,
          lastMessage: msg.text,
          time: msg.createdAt
        };
      }
    });

    res.json(Object.values(inbox));

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
