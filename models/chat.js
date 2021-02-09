var mongoose = require('mongoose');
var Schema = mongoose.Schema

var chatSchema = new Schema(
    {
        chatRoom: { type: String },
        message: { type: String },
        userOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }},
        {timestamps: { currentTime: () => Date.now()  }}
    );

module.exports = mongoose.model('chats', chatSchema);