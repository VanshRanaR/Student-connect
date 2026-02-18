const router = require("express").Router();
const meet = require("../controllers/meetingController");

router.post("/request", meet.requestMeeting);
router.get("/:id", meet.getMeetings);
router.patch("/:id", meet.updateMeetingStatus);

module.exports = router;
