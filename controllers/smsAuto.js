const cron = require('node-cron');
const express = require('express');
const Patient = require("../models/patient");
const Doctor = require("../models/doctor");
const User = require("../models/user");
const Sms = require("../models/sms");
const { now } = require('mongoose');





// cron.schedule('*/2 * * * * *', function () {



//     console.log('---------------------');
//     console.log('Running Cron Job');
//     User.count(function (err, count) {
//         console.dir(err);
//         console.dir(count);
//         if (count == 0) {
//             console.log("no records found: " + count);
//         }
//         else {
//             User.find().then((user) => {
//                 user.forEach(element => {
//                     // let date = Date.now();
//                     // console.log(date.getDate());
//                     // console.log(date.getMonth());

//                     console.log("mois" + element.profile.birthday.getDate());
//                     console.log("jrs" + element.profile.birthday.getMonth());



//                 });
//             });

//         }
//     });
// });

module.exports = cron;