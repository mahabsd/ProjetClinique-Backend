var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notification = new Schema({
    reciever: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String },
    userOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdDate: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('notification', notification);