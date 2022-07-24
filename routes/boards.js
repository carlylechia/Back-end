const { addBoard, getBoards, searchBoards, getBoardData } = require("../controllers/BoardController");
const router = require("express").Router();

router.post("/addboard/", addBoard);
router.post("/getboards/", getBoards);
router.post("/searchboards/", searchBoards);
router.get("/:id", getBoardData);

module.exports = router;