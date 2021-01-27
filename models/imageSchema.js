const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var imageSchema = new mongoose.Schema({
    
    
    img:
    {
        data: String,
        contentType: String
    },
    path:String
});

const Image= mongoose.model('Image', imageSchema);
module.exports=Image;