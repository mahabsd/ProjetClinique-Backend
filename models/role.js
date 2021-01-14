var mongoose = require('mongoose');
var Schema = mongoose.Schema

var roleSchema = new Schema(
    {
        role: [{ type: String }]},
      {  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }

    });

module.exports = mongoose.model('Role', roleSchema);
