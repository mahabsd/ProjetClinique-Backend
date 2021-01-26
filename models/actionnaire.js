var mongoose = require('mongoose');
var Schema = mongoose.Schema

var actionnaireSchema = new Schema(
    {
        username: { type: String },
        password: { type: String },
    profile: {
        name: { type: String },
        surname: { type: String },
        birthday: { type: String },
        image: { type: String },
    },
    work: {
        position: { type: String },
    },
    contacts: {
        email: { type: String },
        phone: { type: String },
        address: { type: String },
    },
    settings:{
        isDeleted: { type: Boolean },
        bgColor: { type: String }
    },
   

},
{ timestamps: true }
);

module.exports = mongoose.model('Actionnaire', actionnaireSchema);
