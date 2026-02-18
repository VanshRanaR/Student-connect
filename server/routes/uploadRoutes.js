const express = require("express");
const upload = require("../middleware/upload");

const router = express.Router();

// IMAGE UPLOAD ROUTE
router.post("/", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    res.status(200).json({
      success: true,
      imageUrl: req.file.path   // Cloudinary URL
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Upload failed" });
  }
});

module.exports = router;
