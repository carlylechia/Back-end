const { setDefaultColumns, getColumns } = require("../controllers/ColumnController");
const router = require("express").Router();

router.post("/setdefaults/", setDefaultColumns);
router.post("/getcolumns/", getColumns);

module.exports = router;
