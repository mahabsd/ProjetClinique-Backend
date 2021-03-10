const User = require("../models/user");
const Role = require("../models/role");
const bcrypt = require('bcryptjs');


const roles = [
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
const users = [
    {
        username: "pretty",
        password:  bcrypt.hashSync("123"),
        profile: {
            name: "Ashley",
            surname: "Ahlberg",
            birthday: new Date(1981, 2, 29),
            gender: "female",
            image: "https://okbaclinical.herokuapp.com/api/img/ashley.jpg"
        },
        work: {
            company: "Google",
            roles: [],
            soldeConge: 5 
        },
        contacts: {
            email: "ashley@gmail.com",
            phone: "(202) 756-9756",
            address: "Washington"
        },
        settings: {
            // isActive: true,
            isDeleted: false,
            registrationDate: "2012-10-13T12:20:40.511Z",
            joinedDate: "2017-04-21T18:25:43.511Z",
            bgColor: "gradient-purple"
        },
        roles: []
    },
    {
        username: "adam",
        password:  bcrypt.hashSync("123"),
        profile: {
            name: "adam",
            surname: "Ahlberg",
            birthday: new Date(1981, 2, 29),
            gender: "female",
            image: "https://okbaclinical.herokuapp.com/api/img/adam.jpg"
        },
        work: {
            company: "Google",
            roles: [],
            soldeConge: 5 
        },
        contacts: {
            email: "adam@gmail.com",
            phone: "(202) 756-9756",
            address: "Washington"
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
// To Count Documents of a particular collection

Role.count(function (err, count) {
    if (count == 0) {
        Role.insertMany(roles).then((rolesDB) => {
            console.log(rolesDB);
            // ajouter les users with roles
            User.count(function (err, count) {
                console.dir(err);
                console.dir(count);
                if (count == 0) {
                    // replaces roles by ids

                    Role.findOne({ name: "admin" }, function (error, roleDB) {
                        users.map(user => user.work.roles = roleDB._id)
                        User.insertMany(users).then((usersDB) => {
                            console.log(usersDB);
                        }).catch(err => console.log(err))
                    });
                }
            });
        }).catch(err => console.log(err))
    }

});
