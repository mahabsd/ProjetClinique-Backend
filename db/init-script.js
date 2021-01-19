const mongoose = require('mongoose');
const User = require("../models/user")
const bcrypt = require('bcryptjs');

var roles = [
    {name: "admin"},
    {name: "pdg"},
]


const salt = bcrypt.genSaltSync(10);
var users =[
    {email : "nidhal@gmail.com", password: bcrypt.hashSync("admin", salt)},
    {email : "admin@gmail.com", password: bcrypt.hashSync("admin", salt)},
];


// var user = {
//     Email: "admin@gmail.com",
//     password: "admin"
// }
// bcrypt.hash(user.password, 10, function (err, hash) {
//     user.password = hash;
// });

mongoose.connect('mongodb://localhost:27017/projetclinique', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(result => {
    console.log("connected to dataBase");

    // To Count Documents of a particular collection
    mongoose.connection.db.collection('users').count(function (err, count) {
        console.dir(err);
        console.dir(count);
        if (count == 0) {
        
            User.insertMany(users).then((users)=>{
                console.log("users added sucessfully");
            }).catch(err => console.log(err))
        }
        else {
            console.log("Found Records : " + count);
        }
    });

}).catch(err => { console.log(err); });