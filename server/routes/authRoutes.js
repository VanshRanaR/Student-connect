const router = require("express").Router();
const auth = require("../controllers/authController");
const upload = require("../middleware/upload");

router.post("/register-student", auth.registerStudent);

// Add photo upload here for senior
router.post("/register-senior", upload.single("photo"), auth.registerSenior);

router.post("/login", auth.loginUser);

module.exports = router;
