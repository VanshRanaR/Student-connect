const User = require("../models/User");

// Get pending seniors
exports.getPendingSeniors = async (req, res) => {
  const seniors = await User.find({
    role: "senior",
    status: "pending"
  });

  res.json(seniors);
};

// Approve senior
exports.approveSenior = async (req, res) => {
  const { id } = req.params;

  await User.findByIdAndUpdate(id, { status: "approved" });

  res.json({ message: "Senior approved" });
};
