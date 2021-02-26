var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notification = new Schema(
  {
    reciever: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String },
    userOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    seen: { type: Boolean, default: false },
    messages: {  type: Boolean}
  },
  { timestamps: true }

);

module.exports = mongoose.model('notification', notification);