var mongoose = require('mongoose');
var Schema = mongoose.Schema

var maintenanceSchema = new Schema(
    {
        type: { type: String } ,
        descriptionMaintenance: { type: String },
        statut: { type: String },
        userOwner: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]} ,
        {timestamps: { currentTime: () => Date.now() }}
    );

module.exports = mongoose.model('Maitenance', maintenanceSchema);