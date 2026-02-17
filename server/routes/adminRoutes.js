const router = require("express").Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

// GET ALL PENDING USERS
router.get("/pending-users", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json("Access denied");

    const users = await User.find({ status: "pending" });
    res.json(users);
  } catch (err) {
    res.status(500).json("Server error");
  }
});

// APPROVE USER
router.put("/approve/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json("Access denied");

    await User.findByIdAndUpdate(req.params.id, {
      status: "approved"
    });

    res.json("User Approved");
  } catch (err) {
    res.status(500).json("Server error");
  }
});

// REJECT USER
router.put("/reject/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json("Access denied");

    await User.findByIdAndUpdate(req.params.id, {
      status: "rejected"
    });

    res.json("User Rejected");
  } catch (err) {
    res.status(500).json("Server error");
  }
});

module.exports = router;
