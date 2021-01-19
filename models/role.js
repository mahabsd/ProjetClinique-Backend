var mongoose = require('mongoose');
var Schema = mongoose.Schema

var roleSchema = new Schema(
    {
        name: { type: String }},
      {  timestamps: true }
    );

module.exports = mongoose.model('Role', roleSchema);
