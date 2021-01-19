// connect to database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/projetclinique', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(result => {
    console.log("connected to dataBase");