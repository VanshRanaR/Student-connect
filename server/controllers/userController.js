const User = require("../models/User");

exports.getApprovedSeniors = async (req, res) => {
  try {
    const seniors = await User.find({
      role: "senior",
      status: "approved"
    }).select("-password");

    res.json(seniors);

  } catch (err) {
    res.status(500).json(err.message);
  }
};
