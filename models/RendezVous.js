var mongoose = require('mongoose');
var Schema = mongoose.Schema

var RendezVousSchema = new Schema(
    {
      title: { type: String },
        descrip: { type: String },
        userOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        start:  Date ,
        isEdit: { type: String },
        // // color: {default:colors.red},
        // actions: { 
        //   default:this.actions}
      },
        

        
      {  timestamps: true

    });

module.exports = mongoose.model('RendezVous', RendezVousSchema);
