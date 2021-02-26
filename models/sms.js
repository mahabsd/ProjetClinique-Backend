var mongoose = require('mongoose');
var Schema = mongoose.Schema


var smsSchema = new Schema(
    {
       
        from: { type: String ,
            default:"Clinique Okba"
        },
        status: { type: String },
        contacts: {
        phone: { type: String },
        type: { type: Number },
        message: { type: String },
        },
        smsPatient:{ type: mongoose.Schema.Types.ObjectId,refPath: 'Patient'},
        smsActionnaire:{ type: mongoose.Schema.Types.ObjectId,refPath: 'Actionnaire'},
        smsDoctor:{ type: mongoose.Schema.Types.ObjectId,refPath: 'Doctor'},
        userOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }},
        {timestamps: { currentTime: () => Date.now()  }}
    );
module.exports = mongoose.model('Sms', smsSchema);