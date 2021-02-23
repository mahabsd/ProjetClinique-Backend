var mongoose = require('mongoose');
var Schema = mongoose.Schema

var doctorSchema = new Schema(
    
    {
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
        userDoctor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        
    },
    { timestamps: true })
module.exports = mongoose.model('Doctor', doctorSchema);
