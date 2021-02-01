var mongoose = require('mongoose');
var Schema = mongoose.Schema

var RendezVousSchema = new Schema(
    {
      title: { type: String },
        descrip: { type: String },
        userOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        start: { type: String },
        isEdit: { type: String }},

        
      {  timestamps: true

    });

module.exports = mongoose.model('RendezVous', RendezVousSchema);
