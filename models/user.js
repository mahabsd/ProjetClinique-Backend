var mongoose = require('mongoose');
var Schema = mongoose.Schema

var userSchema = new Schema(

    {
        username: { type: String },
        password: { type: String },
        profile: {
            name: { type: String },
            surname: { type: String },
            birthday: { type: String },
            gender: { type: String },
            image: { type: String },
            cin: { type: String },
        },
        work: {
            company: { type: String },
            roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
            soldeConge: { type: String },
        },
        contacts: {
            email: { type: String },
            phone: { type: String },
            address: { type: String },
        },
        social: {
            facebook: { type: String },
            twitter: { type: String },
            google: { type: String },
        },
        settings: {
            status: { type: String },
            // isActive: { type: Boolean },
            isDeleted: { type: Boolean },
            registrationDate: { type: String },
            createdAt: { type: String },
            joinedDate: { type: String },
            bgColor: { type: String }
        },
    },
    { timestamps: true })

module.exports = mongoose.model('User', userSchema);

