const mongoose = require('mongoose');
const Schema = mongoose.Schema


let smsSchema = new Schema(
    {
       
        from: { type: String ,
            default:"Clinique Okba"
        },
        status: { type: String ,
          
        },
        contacts: {
        phone: { type: String },
        type: { type: Number },
        message: { type: String },
        },
        smsOwner:{ type: mongoose.Schema.Types.ObjectId,ref: 'Patient'},
        acts:{ type: mongoose.Schema.Types.ObjectId,ref: 'Actionnaire'},
        docs:{ type: mongoose.Schema.Types.ObjectId,ref: 'Doctor'},
        user:{ type: mongoose.Schema.Types.ObjectId,ref: 'User'},



        userOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }},
        {timestamps: true}
    );
  
module.exports = mongoose.model('Sms', smsSchema);