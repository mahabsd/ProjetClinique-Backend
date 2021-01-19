var mongoose = require('mongoose');
var Schema = mongoose.Schema

var doctorSchema = new Schema(
    
       { firstName: { type: String },
        lastName: { type: String },
        Email: { type: String },
        phone: { type: String },
        adresse: { type: String },
        birthday: { type: String },
        specialité: { type: String },
        userDoctor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        image : {type : String}},
        {timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }}
    );

module.exports = mongoose.model('Doctor', doctorSchema);
