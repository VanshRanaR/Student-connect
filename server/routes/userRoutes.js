const router = require("express").Router();
const userController = require("../controllers/userController");

router.get("/seniors", userController.getApprovedSeniors);

module.exports = router;
