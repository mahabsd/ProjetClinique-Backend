var mongoose = require('mongoose');
var Schema = mongoose.Schema

var RendezVousSchema = new Schema(
    {
        titre: [{ type: String }],
        userRendezVous: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        dateDebut: [{ type: String }],
        dateFin: [{ type: String }]},
      {  timestamps: true

    });

module.exports = mongoose.model('RendezVous', RendezVousSchema);
