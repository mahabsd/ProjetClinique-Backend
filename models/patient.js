const mongoose = require('mongoose');
const Schema = mongoose.Schema

let patientSchema = new Schema(
    {
        
        cin: { type: String },
        dateDentre: { type: String },
        service: { type: String },
        description: { type: String },
        profile: {
            name: { type: String },
            surname: { type: String },
            birthday: { type: String },
            image: { type: String,
                default:"assets/img/users/default-user.jpg" },
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

