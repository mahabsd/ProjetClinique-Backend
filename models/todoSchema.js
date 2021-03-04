const mongoose = require('mongoose');
const schema = mongoose.Schema;


let todoSchema = new schema(
   { text: {
        type: String
    },
    userOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }},
    { timestamps: true }

)

module.exports = mongoose.model("todoSchema", todoSchema)