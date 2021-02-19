var mongoose = require('mongoose');
var Schema = mongoose.Schema

var maintenanceSchema = new Schema(
    {
        title: { type: String } ,
        type: { type: String } ,
        descriptionMaintenance: { type: String },
        statut: { type: String ,
                 default:"pending"
        },
        notifications : {type :Boolean, default : false},
        userOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }} ,
        {timestamps: { currentTime: () => Date.now() }}
        
    );

module.exports = mongoose.model('Maitenance', maintenanceSchema);