const router = require("express").Router();
const admin = require("../controllers/adminController");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/pending", adminMiddleware, admin.getPendingSeniors);
router.patch("/approve/:id", adminMiddleware, admin.approveSenior);

module.exports = router;
