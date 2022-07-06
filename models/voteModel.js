const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const voteSchema = new Schema({
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  ticket: {
    type: Schema.Types.ObjectId,
    ref: 'Ticket',
    required: true
  }
})

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
