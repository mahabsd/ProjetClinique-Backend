var mongoose = require('mongoose');
var Schema = mongoose.Schema

var userSchema = new Schema(
    
       { firstName: { type: String },
        lastName: { type: String },
        email: { type: String },
        password: { type: String },
        soldeCongé: { type: String },
        phone: { type: String },
        adresse: { type: String },
        birthday: { type: String },
        cin: { type: String },
        role: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
        image : {type : String},
        status: {type : String},
        genre: {type : String}},
        {timestamps: true}
    );

module.exports = mongoose.model('User', userSchema);

