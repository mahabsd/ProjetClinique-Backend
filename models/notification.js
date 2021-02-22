var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notification = new  Schema({

        text : {type: String},
        userOwner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        createdDate: {type: Date, default: Date.now()},
});

module.exports = mongoose.model('notification', notification);