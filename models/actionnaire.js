var mongoose = require('mongoose');
var Schema = mongoose.Schema

var actionnaireSchema = new Schema(
       { firstName: { type: String },
        lastName: { type: String },
        Email: { type: String },
        phone: { type: String },
        adresse: { type: String },
        birthday: { type: String },
        specialité: { type: String },
        userActionnaire: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        image : {type : String}},
        {timestamps: true}
    );

module.exports = mongoose.model('Actionnaire', actionnaireSchema);
