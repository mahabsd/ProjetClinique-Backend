const mongoose = require('mongoose');
const Schema = mongoose.Schema


let smsSchema = new Schema(
    {

        from: {
            type: String,
            default: "Clinique Okba"
        },
        status: {
            type: String,

        },
        contacts: {
            phone: { type: String },
            type: { type: Number },
            message: { type: String },
        },
        smsOwner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: 'onModel'
        },
        onModel: {
            type: String,
            required: true,
            enum: ['Patient', 'Actionnaire', 'User', 'Doctor']
        },

        userOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Sms', smsSchema);