const mongoose = require('mongoose');
const Schema = mongoose.Schema

let congeSchema = new Schema(
    {
        nbreJours: { type: Number },
        dateDebut: { type: Date },
        dateFin: { type: Date },
        motif: { type: String },
        status: { type: String },
        notifications : {type :Boolean, default : false},
        userOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }},
        {timestamps: true}
    );

module.exports = mongoose.model('Conge', congeSchema);