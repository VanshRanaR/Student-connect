const Meeting = require("../models/Meeting");

// Send meeting request
exports.requestMeeting = async (req, res) => {
  try {
    const { student, mentor, message, date, time } = req.body;

    if (!student || !mentor || !date || !time || !message) {
      return res.status(400).json("All fields required");
    }

    const meet = await Meeting.create({
      student,
      mentor,
      message,
      date,
      time,
      status: "pending"
    });

    res.json(meet);
  } catch (err) {
    console.log("Meeting Error:", err);
    res.status(500).json(err.message);
  }
};

// Approve / Reject meeting
exports.updateMeetingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const meet = await Meeting.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(meet);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// Get meetings for specific user
exports.getMeetings = async (req, res) => {
  try {
    const userId = req.params.id;

    const meetings = await Meeting.find({
      $or: [
        { student: userId },
        { mentor: userId }
      ]
    });

    res.json(meetings);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
