const mongoose = require('mongoose');
const User = require("../models/user")
const bcrypt = require('bcryptjs');

module.exports = function (config) {
var roles = [
    { name: "admin" },
    { name: "pdg" },
]

const salt = bcrypt.genSaltSync(10);
var users = [
    { email: "nidhal@gmail.com", password: bcrypt.hashSync("admin", salt) },
    { email: "admin@gmail.com", password: bcrypt.hashSync("admin", salt) },
];

// var user = {
//     Email: "admin@gmail.com",
//     password: "admin"
// }
// bcrypt.hash(user.password, 10, function (err, hash) {
//     user.password = hash;
// });

db = mongo.db('mongodb://localhost:27017/projetclinique')
// To Count Documents of a particular collection
mongoose.connection.db.collection('users').count(function (err, count) {
    console.dir(err);
    console.dir(count);
    if (count == 0) {

        User.insertMany(users).then((users) => {
            console.log("users added sucessfully");
        }).catch(err => console.log(err))
    }
    else {
        console.log("Found Records : " + count);
    }
});
}