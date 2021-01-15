var mongoose = require('mongoose');
var Schema = mongoose.Schema

var patientSchema = new Schema(
    {
        name: { type: String },
        prename: { type: String },
        Email: { type: String },
        password: { type: String },
        dateEntree: { type: Date },
        phone: { type: String },
        adresse: { type: String },
        birthday: { type: String },
        Cin: { type: String },
        status: { type: String },
        descriptionAct: { type: String },
        service: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }]},
        {timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }}

    );

module.exports = mongoose.model('Patient', patientSchema);

