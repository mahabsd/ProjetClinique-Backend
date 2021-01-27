var mongoose = require('mongoose');
var Schema = mongoose.Schema

var serviceSchema = new Schema(
    {
        name: { type: String },
    });

module.exports = mongoose.model('Service', serviceSchema);