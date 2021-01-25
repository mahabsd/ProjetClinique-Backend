var mongoose = require('mongoose');
var Schema = mongoose.Schema

var patientSchema = new Schema(
    {
        cin: { type: String },
        profile: {
            name: { type: String },
            surname: { type: String },
            birthday: { type: Date },
            gender: { type: String },
            descriptionAct: { type: String },
            image: { type: String },
        },

        contacts: {
            email: { type: String },
            phone: { type: String },
            address: { type: String },
        },
        settings: {
            isDeleted: { type: Boolean },
            bgColor: { type: String },

            dateEntree: { type: Date },
            status: { type: String },
        },
        work: {
            company: { type: String },
            position: { type: String },
        },
        service: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }]},
        { timestamps: { currentTime: () => Date.now() } }

);


module.exports = mongoose.model('Patient', patientSchema);

