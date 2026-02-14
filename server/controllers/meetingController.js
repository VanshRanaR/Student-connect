const Meeting = require("../models/Meeting");

// Send meeting request
exports.requestMeeting = async (req, res) => {
  try {
    const { student, senior, message, date } = req.body;

    const meet = await Meeting.create({
      student,
      senior,
      message,
      date
    });

    res.json(meet);

  } catch (err) {
    res.status(500).json(err.message);
  }
};

// Senior accept/reject
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

// Get all meetings for user
exports.getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({
      $or: [
        { student: req.params.id },
        { senior: req.params.id }
      ]
    });

    res.json(meetings);

  } catch (err) {
    res.status(500).json(err.message);
  }
};
