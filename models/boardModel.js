const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const boardSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Board name must be provided.'],
    maxlength: [30, 'Board name can not exceed 30 characters.']
  },
  code: {
    type: String,
    required: [true, 'Please provide a code for this board.']
  },
  creator: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // columns: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Column',
  //   required: true,
  // }
});

boardSchema.virtual('columns', {
  ref: 'Column',
  localField: '_id',
  foreignField: 'board',
});

boardSchema.set('toObject', {virtuals: true});
boardSchema.set('toJSON', {virtuals: true});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
