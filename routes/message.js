const { addMessage, getMessages, clearChatMessages } = require("../controllers/messageController");
const router = require("express").Router();

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);
router.post("/clearchat/", clearChatMessages);

module.exports = router;
