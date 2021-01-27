const User = require("../models/user");
const Role = require("../models/role");
const Service = require("../models/service");
const bcrypt = require('bcryptjs');


var roles = [
    { name: "admin" },
    { name: "pdg" },
    { name: "Responsable-info" },
    { name: "responsable-RH" },
    { name: "directeur-technique" },
    { name: "secritaire personnelle" },
    { name: "surveillant Générale" },
    { name: "secritaire générale" },
    { name: "responsable facturation" },
    { name: "Respnsable Pharmacie" },
    { name: "respon-financier" },
    { name: "gouvernantes" },
    { name: "hyginiste" },
    { name: "administration" },
    { name: "surveillant chirurgie" },
    { name: "surveillant Anesthésie" },
    { name: "surveillant Bloc" },
    { name: "surveillant Maternité" },
    { name: "respon-maintenance" },
    { name: "cassiers principale" },
    { name: "econome" },
    { name: "comptable" },
    { name: "acceuil+cassiers+facturations " },
    { name: "infirmiers et aide" },
    { name: "anesthesistes" },
    { name: "ouvriers" },
    { name: "cuisine" },
    { name: "team-matenaince" },
    { name: "Services" },
    { name: "pharmaciens" },
]
var services = [
    { name: "Bloc" },
    { name: "Covid" },
    { name: "Chirurgie" },
    { name: "Maternité" },
]

const salt = bcrypt.genSaltSync(10);
var users = [
    // { username: "nidhal", lastName: "nidhal", profile: {name:"nidhal",surname: "nidhal"},contacts:{email: "nidhal@gmail.com"}, password: bcrypt.hashSync("admin", salt), roles: [] },
    // { username: "admin", lastName: "admin", profile: {name:"nidhal",surname: "nidhal"}, contacts:{email: "admin@gmail.com"}, password: bcrypt.hashSync("admin", salt), roles: [] },
    {
        username: "pretty",
        password:  bcrypt.hashSync("123"),
        profile: {
            name: "Ashley",
            surname: "Ahlberg",
            birthday: new Date(1981, 2, 29),
            gender: "female",
            image: "assets/img/profile/ashley.jpg"
        },
        work: {
            company: "Google",
            roles: [],
            soldeConge: 0
        },
        contacts: {
            email: "ashley@gmail.com",
            phone: "(202) 756-9756",
            address: "Washington"
        },
        social: {
            facebook: "ashley_ahlberg",
            twitter: "ashley_ahlberg",
            google: "ashley_ahlberg"
        },
        settings: {
            // isActive: true,
            isDeleted: false,
            registrationDate: "2012-10-13T12:20:40.511Z",
            joinedDate: "2017-04-21T18:25:43.511Z",
            bgColor: "gradient-purple"
        },
        roles: []
    }
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
                        users.map(user => user.work.roles = roleDB._id)
                        User.insertMany(users).then((users) => {
                            console.log("users added successfully");
                        }).catch(err => console.log(err))
                    });
                }
                else {
                    console.log("Found Records : " + count);
                }
            });
        }).catch(err => console.log(err))
    }
    else {
        console.log("Found Records : " + count);
    }



});

// Service.count(function (err, count) {
//     if (count == 0) {
//         Service.insertMany(services).then((servicesDB) => {
//             console.log("service added successfully");
//             console.log(servicesDB);
//         }
//     }
// });