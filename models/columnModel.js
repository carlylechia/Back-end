const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const columnSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 30
  },
  board: {
    type: Schema.Types.ObjectId,
    ref: 'Board',
    required: true,
  },
  // tickets: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Tickets',
  // }]
});

columnSchema.virtual('tickets', {
  ref: 'Ticket',
  localField: '_id',
  foreignField: 'column',
});

columnSchema.set('toObject', {virtuals: true});
columnSchema.set('toJSON', {virtuals: true});

const Column = mongoose.model('Column', columnSchema);

module.exports = Column;
