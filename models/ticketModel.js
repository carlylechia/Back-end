const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ticketSchema = new Schema({
  content: {
    type: String,
    required: [true, 'Please provide the ticket content']
  },
  userId: String,
  column: {
    type: Schema.Types.ObjectId,
    ref: 'Column',
    required: true,
  },
  // votes: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Vote',
  // }
}, {timestamps: true})

ticketSchema.virtual('votes', {
  ref: 'Vote',
  localField: '_id',
  foreignField: 'ticket',
});

ticketSchema.set('toObject', {virtuals: true});
ticketSchema.set('toJSON', {virtuals: true});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
