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
        {timestamps: true}
    );

module.exports = mongoose.model('Doctor', doctorSchema);
