const Boards = require("../models/boardModel");
const uuidv4 = require('uuid');

module.exports.getBoards = async (req, res, next) => {
  try {
    const creator = req.body.creator;

    const boards = await Boards.find({
      creator: {
        $all: creator,
      },
    }).select(["name", "code", "_id", "users"]);

    res.json(boards);
  } catch (ex) {
    next(ex);
  }
};

module.exports.getBoardData = async (req, res, next) => {
  try {
    const board = await Boards.findOne({_id: req.params.id }).select(["name", "code", "_id", "users"]);

    res.json(board);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addBoard = async (req, res, next) => {
  try {
    const { name, creator } = req.body;
    const data = await Boards.create({
      name,
      code: Math.floor(Math.random()*1000),
      creator,
      users: [creator],
    });

    if (data) return res.json(data);
    else return res.json({ msg: "Failed to add board to the database" });
  } catch (ex) {
    next(ex);
  }
};

module.exports.searchBoards = async (req, res, next) => {
  try {
    const { creator, name } = req.body;

    if (name === '') {
      const boards = await Boards.find({
        creator: {
          $all: creator,
        },
      }).select(["name", "code", "_id", "users"]);
  
      res.json(boards);      
    }
    const filteredBoards = await Boards.find({
      creator: {
        $all: creator,
      },
      name,
    }).select(["name", "code", "_id", "users"]);
    
    res.json(filteredBoards);
  } catch (ex) {
    next(ex);
  }
};
