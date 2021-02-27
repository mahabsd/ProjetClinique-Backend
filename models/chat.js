var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var privateChat = new  Schema(
   { candidat1:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    candidat2:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    messages:[ {
        content: {type: String},
        logo : {type: String},
        candidat: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        createdDate:  { type: Date, default: new Date()},
        files:[],
        notifications : {type :Boolean, default : false},
    }]
},
{ timestamps: true }
);

module.exports = mongoose.model('privateChat', privateChat);