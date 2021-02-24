var mongoose = require('mongoose');
var Schema = mongoose.Schema


var smsSchema = new Schema(
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
        smsOwner:{ type: mongoose.Schema.Types.ObjectId,ref: 'patient'},
        
        userOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }},
        {timestamps: { currentTime: () => Date.now()  }}
    );
  
module.exports = mongoose.model('Sms', smsSchema);