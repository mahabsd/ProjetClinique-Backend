const mongoose = require('mongoose');
const Schema = mongoose.Schema

let userSchema = new Schema(

    {
        username: { type: String },
        password: { type: String },
        profile: {
            name: { type: String },
            surname: { type: String },
            birthday: { type: String },
            gender: { type: String },
            image: { type: String },
        },
        work: {
            company: { type: String },
            roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
            soldeConge: { type: Number },
        },
        contacts: {
            email: { type: String },
            phone: { type: String },
            address: { type: String },
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

