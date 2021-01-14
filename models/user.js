var mongoose = require('mongoose');
var Schema = mongoose.Schema

var userSchema = new Schema(
    
       { firstName: { type: String },
        lastName: { type: String },
        Email: { type: String },
        password: { type: String },
        soldeCongé: { type: String },
        phone: { type: String },
        adresse: { type: String },
        birthday: { type: String },
        Cin: { type: String },
        role: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
        image : {type : String},
        status: {type : String},
        genre: {type : String}},
        {timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }}
    );

module.exports = mongoose.model('User', userSchema);

