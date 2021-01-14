var mongoose = require('mongoose');
var Schema = mongoose.Schema

var roleSchema = new Schema(
    {
        role: { type: String },
    });

module.exports = mongoose.model('Role', roleSchema);
