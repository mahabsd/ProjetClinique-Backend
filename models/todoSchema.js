const mongoose = require('mongoose');
var schema = mongoose.Schema;


var todoSchema = new schema(
   { text: {
        type: String
    },
    userOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }},
    { timestamps: true }

)

module.exports = mongoose.model("todoSchema", todoSchema)