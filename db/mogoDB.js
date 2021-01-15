const mongoose = require('mongoose');
const User = require("../models/user")
const bcrypt = require('bcryptjs');


var user = {
    Email: "admin@gmail.com",
    password: "admin"
}
bcrypt.hash(user.password, 10, function (err, hash) {
    user.password = hash;
});

mongoose.connect('mongodb://localhost:27017/projetclinique', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(result => {
    console.log("connected to dataBase");

    // To Count Documents of a particular collection
    mongoose.connection.db.collection('users').count(function (err, count) {
        console.dir(err);
        console.dir(count);
        if (count == 0) {
          
            User.create(user, function(e) {
                if (e) {
                    throw e;
                }
                console.log("No Found Records.");
               
            });
        }
        else {
            console.log("Found Records : " + count);
        }
    });

}).catch(err => { console.log(err); });