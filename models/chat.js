var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var privateChat = new  Schema({
    candidat1:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    candidat2:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    messages:[ {
        content: {type: String},
        logo : {type: String},
        candidat: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        name : {type: String ,default :""},
        createdDate: {type: Date, default: Date.now()}
    
}]
});

module.exports = mongoose.model('privateChat', privateChat);