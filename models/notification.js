const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let notification = new Schema(
  {
    reciever: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String },
    userOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   // seen: { type: Boolean, default: false },
    messages: {  type: Boolean , default: false},
    maintenance : {  type: Boolean, default: false},
    conge : {  type: Boolean, default: false},
  },
  { timestamps: true }

);

module.exports = mongoose.model('notification', notification);