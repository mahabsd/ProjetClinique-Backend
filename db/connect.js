const mongoose = require('mongoose');

//connect to data base

mongoose.connect('mongodb://localhost:27017/projetclinique', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(result => {
    console.log("connected to dataBase");  

}).catch(err => { console.log(err); });