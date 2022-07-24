const Columns = require('../models/columnModel');

module.exports.setDefaultColumns = async (req, res, next) => {
  try {
    const { name, board } = req.body;
    const data = await Columns.create({
      name,
      board,
    });

    if (data) return res.json(data);
    else return res.json({ msg: "Failed to add column to the database" });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getColumns = async (req, res, next) => {
  try {
    const board = req.body.board;
    console.log(board);
    const columns = await Columns.find({
      board: {
        $all: board,
      },
    }).select(["name", "_id"]);

    res.json(columns);
  } catch (ex) {
    next(ex);
  }
};
