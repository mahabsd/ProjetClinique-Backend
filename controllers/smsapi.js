const express = require('express')
const router = express.Router();
const request = require('request');
const Sms = require("../models/sms")
const cron = require('node-cron');
const passport = require('passport');
const Patient = require("../models/patient");
const Doctor = require("../models/doctor");


router.get('/smssend/:lang/:phone/:message', passport.authenticate('bearer', { session: false }), async (req, res) => {

    console.log(req.params);
    await request(`https://api.1s2u.io/bulksms?username=smsnidhal15020&password=web55023&mt=0&fl=${req.params.lang}&sid=CliniqueOkba&mno=${req.params.phone}&msg=${req.params.message}`, function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        res.send(body)
    });
});

router.post('/sms/add/', passport.authenticate('bearer', { session: false }), async (req, res, next) => {

    await Sms.create(req.body).then(function (sms) {

        res.status(200).json(sms);

    });


    router.get('/sms/:id', passport.authenticate('bearer', { session: false }), async (req, res) => {

        await Sms.findOne({ _id: req.params.id }) // key to populate
            .then(sms => {
                // res.json(sms);
                res.status(200).json(" successfully");
                // res.send(data); la meme que json(data)
            }).catch(err => res.status(400).json('Error: ' + err));
    })
});


router.delete('/sms/delete/:id', passport.authenticate('bearer', { session: false }), async (req, res) => {


    await Sms.findByIdAndRemove({ _id: req.params.id }).then(function (sms) {
        // res.send(sms);
        res.status(200).json("deleted successfully");

    }).catch(err => res.status(400).json('Error: ' + err));


});


router.put('/sms/update/:id', passport.authenticate('bearer', { session: false }), async (req, res) => {


    await Sms.findByIdAndUpdate({ _id: req.params.id }, req.body).then(async () => {
        await Sms.findOne({ _id: req.params.id }).then(function (sms) {
            // res.send(sms);
            res.status(200).json("successfully");
        }).catch(err => res.status(400).json('Error: ' + err));
    })



});


router.get('/getAllsmss', passport.authenticate('bearer', { session: false }), async (req, res) => {

    await Sms.find({}).populate('smsOwner').then(function (smss) {
        res.status(200).json(smss);
    }).catch(err => res.status(400).json('Error: ' + err));

});



cron.schedule('*/5 * * * *', function (res) {
    console.log('---------------------');
    console.log('Running Cron Job');
    Patient.count(function (err, count) {
        console.dir(err);
        console.dir(count);
        if (count == 0) {
            console.log("no records found: " + count);
        }
        else {
            Patient.find().then((patient) => {
                patient.forEach(element => {
                    let date = new Date(Date.now());


                    date1 = new Date(Date.parse(element.profile.birthday));
                    console.log(parseInt(date.getDate(), 10));
                    console.log(parseInt(date.getMonth(), 10));
                    console.log(parseInt(date.getDate(), 10) - parseInt(date.getMonth(), 10));

                    if (date1.getDate() === date.getDate() && date1.getMonth() === date.getMonth()) {
                        var message = {
                            status: "en cours",
                            userOwner: element._id,

                            contacts: {
                                phone: element.contacts.phone,
                                type: "0",
                                message: "Clinique Okba Vous souhaite un joyeuse Anniversaire",
                            },

                        }

                        Sms.create(message).then(function (sms) {


                        })
                    }
                });
            });
            Patient.find().then((patient) => {
                patient.forEach(element => {
                    let date = new Date(Date.now());
                    date1 = new Date(Date.parse(element.dateDentre));
                    if ((parseInt(date1.getDate(), 10) - parseInt(date.getDate(), 10) === 3 &&
                        element.service === "Maternité" && element.service === "Accouchement" &&
                        (parseInt(date1.getMonth(), 10) - parseInt(date.getMonth(), 10) === 2
                            || parseInt(date1.getMonth(), 10) - parseInt(date.getMonth(), 10) === 3
                            || parseInt(date1.getMonth(), 10) - parseInt(date.getMonth(), 10) === 6
                            || parseInt(date1.getMonth(), 10) - parseInt(date.getMonth(), 10) === 11)
                        && date1.getFullYear() === date.getFullYear())) {
                        var message = {
                            status: "en cours",
                            smsOwner: element._id,
                            contacts: {
                                phone: element.contacts.phone,
                                type: "0",
                                message: "Clinique Okba Vous informe que le vaccin de votre nouveau né est prévu pour cette semaine ",
                            },

                        }

                        Sms.create(message).then(function (sms) {


                        })
                    }
                });
            });
            Patient.find().then((patient) => {
                patient.forEach(element => {
                    let date = new Date(Date.now());
                    date1 = new Date(Date.parse(element.dateDentre));
                    if ((parseInt(date1.getDate(), 10) - parseInt(date.getDate(), 10) === 3 &&
                        element.service === "Maternité" && element.service === "Accouchement" &&
                        (parseInt(date1.getMonth(), 10) - parseInt(date.getMonth(), 10) === 10
                            || parseInt(date1.getMonth(), 10) - parseInt(date.getMonth(), 10) === 9
                            || parseInt(date1.getMonth(), 10) - parseInt(date.getMonth(), 10) === 6
                            || parseInt(date1.getMonth(), 10) - parseInt(date.getMonth(), 10) === 1)
                        && parseInt(date1.getFullYear(), 10) - parseInt(date.getFullYear(), 10) === -1)) {
                        var message = {
                            status: "en cours",
                            contacts: {
                                phone: element.contacts.phone,
                                type: "0",
                                message: "Clinique Okba Vous informe que le vaccin de votre nouveau né est prévu pour cette semaine",
                            },
                            smsOwner: element._id,
                        }

                        Sms.create(message).then(function (sms) {

                            res.status(200).json(sms);
                        })
                    }
                });
            });
            Doctor.find().then((doctor) => {
                doctor.forEach(element => {
                    let date = new Date(Date.now());
                    date1 = new Date(Date.parse(element.profile.birthday));
                    if (date1.getDate() === date.getDate() && date1.getMonth() === date.getMonth()) {
                        var message = {
                            status: "en cours",
                            contacts: {
                                phone: element.contacts.phone,
                                type: "0",
                                message: "Clinique Okba Vous souhaite un joyeuse Anniversaire",
                            },
                            smsOwner: element._id,
                        }

                        Sms.create(message).then(function (sms) {

                            res.status(200).json(sms);
                        })
                    }
                });
            });


        }
    });
});

module.exports = router;