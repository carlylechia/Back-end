const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const {Schema} = mongoose
const UserSchema = new Schema ({
 name: {
 type: String,
 required: true,
 unique: true
 },
 email: {
  type: String,
  required: true,
  unique: true
  },
 password: {
 type: String,
 required: true
 },
 isAvatarImageSet: {
  type: Boolean,
  default: false,
 },
 avatarImage: {
  type: String,
  default: '',
 }
}, {timestamps: true});

UserSchema.virtual('boardsCreated', {
  ref: 'Board',
  localField: '_id',
  foreignField: 'creator',
});

UserSchema.set('toObject', {virtuals: true});
UserSchema.set('toJSON', {virtuals: true});

//   UserSchema.methods.matchPassword = async function (password) {
//     try {
//       return await bcrypt.compare(password, this.password);
//     } 
//     catch (error) {
//       throw new Error(error);
//     }
//   };
  
const User = mongoose.model('user', UserSchema);

module.exports = User;
