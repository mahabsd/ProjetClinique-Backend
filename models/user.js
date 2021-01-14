var mongoose = require('mongoose');
var Schema = mongoose.Schema

var userSchema = new Schema(
    {
        name: { type: String },
        prename: { type: String },
        Email: { type: String },
        password: { type: String },
        soldeCongé: { type: String },
        phone: { type: String },
        adresse: { type: String },
        birthday: { type: String },
        Cin: { type: String },
        role: {
            type:Schema.Types.ObjectId,ref:'Role'
        },
    });

module.exports = mongoose.model('User', userSchema);

