const User = require("../models/user");
const Role = require("../models/role");
const bcrypt = require('bcryptjs');


var roles = [
    { name: "admin" },
    { name: "pdg" },
]

const salt = bcrypt.genSaltSync(10);
var users = [
    { email: "nidhal@gmail.com", password: bcrypt.hashSync("admin", salt), roles: [] },
    { email: "admin@gmail.com", password: bcrypt.hashSync("admin", salt), roles: [] },
];
var Users;
// To Count Documents of a particular collection
Role.count(function (err, count) {
    console.dir(err);
    console.dir(count);
    if (count == 0) {

        Role.insertMany(roles).then((rolesDB) => {
            console.log("roles added successfully");
            // ajouter les users with roles
            User.count(function (err, count) {
                console.dir(err);
                console.dir(count);
                if (count == 0) {
                    // replaces roles by ids
                    console.log(rolesDB);
                    Role.findOne({ name: "admin" }, function (error, roleDB) {
                        console.log("helo roleee " + roleDB._id);
                        users.map(user => user.roles = roleDB._id)
                        User.insertMany(users).then((users) => {
                            console.log("users added successfully");
                        }).catch(err => console.log(err))
                    });

                }
                else {
                    console.log("Found Records : " + count);
                }
            });
            // end add users
        }).catch(err => console.log(err))
    }
    else {
        console.log("Found Records : " + count);
    }


    
});