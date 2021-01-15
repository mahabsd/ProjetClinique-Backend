var mongoose = require('mongoose');
var Schema = mongoose.Schema

var congeSchema = new Schema(
    {
        nbreJours: { type: Number },
        dateDebut: { type: Date },
        motif: { type: String },
        statut: { type: String },
        userOwner: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    });

module.exports = mongoose.model('Congé', congeSchema);