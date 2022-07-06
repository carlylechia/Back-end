const express = require('express');
const User = require('../models/userModel');

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({_id: { $ne: req.params.id }}).select([
      "name",
      "email",
      "avatarImage",
      "_id"
    ]);
    return res.json(users);
  } catch(ex) {
    next(ex);
  }
};
