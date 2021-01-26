var mongoose = require('mongoose');
var Schema = mongoose.Schema

var patientSchema = new Schema(
    {
        cin: { type: String },
        dateDentre: { type: String },
        service: { type: String },
        description: { type: String },
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


module.exports = mongoose.model('Patient', patientSchema);

