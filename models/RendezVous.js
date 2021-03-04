const mongoose = require('mongoose');
const Schema = mongoose.Schema

let RendezVousSchema = new Schema(
  {
    title: { type: String },
    descrip: { type: String },
    userOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    start: Date,
    isEdit: { type: String },
    notifications : {type :Boolean, default : false},
    // // color: {default:colors.red},
    // actions: { 
    //   default:this.actions}
  },
  {
    timestamps: true
  });

module.exports = mongoose.model('RendezVous', RendezVousSchema);