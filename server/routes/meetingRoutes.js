const router = require("express").Router();
const meet = require("../controllers/meetingController");

router.post("/request", meet.requestMeeting);
router.patch("/:id", meet.updateMeetingStatus);
router.get("/:id", meet.getMeetings);

module.exports = router;
