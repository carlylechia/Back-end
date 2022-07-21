const { addBoard, getBoards, searchBoards } = require("../controllers/BoardController");
const router = require("express").Router();

router.post("/addboard/", addBoard);
router.post("/getboards/", getBoards);
router.post("/searchboards/", searchBoards);

module.exports = router;