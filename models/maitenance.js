const mongoose = require('mongoose');
const Schema = mongoose.Schema

let maintenanceSchema = new Schema(
    {
        title: { type: String } ,
        type: { type: String } ,
        descriptionMaintenance: { type: String },
        statut: { type: String ,
                 default:"pending"
        },
        notifications : {type :Boolean, default : false},
        userOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }} ,
        {timestamps: true}
        
    );

module.exports = mongoose.model('Maitenance', maintenanceSchema);