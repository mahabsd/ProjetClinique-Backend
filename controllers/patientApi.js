const express = require('express');
const router = express.Router();
const Patient = require("../models/patient")

const imgModel = require('../models/imageSchema');
const passport = require('passport');



router.post('/patient/add/', passport.authenticate('bearer', { session: false }), async (req, res, next) => {
    await Patient.create(req.body).then(function (patient) {
                
        res.status(200).json(patient);
    }).catch(next);
});


router.get('/patient/:id',passport.authenticate('bearer', { session: false }), async(req, res) => {
    await Patient.findOne({ _id: req.params.id }) // key to populate
    .then(patient=> {
        // res.json(patient);
        res.status(200).json(" successfully");
        // res.send(data); la meme que json(data)
    }).catch(err => res.status(400).json('Error: ' + err));
});


router.delete('/patient/delete/:id',passport.authenticate('bearer', { session: false }), async (req, res) => {
    await Patient.findByIdAndRemove({ _id: req.params.id }).then(function (patient) {
        // res.send(patient);
        res.status(200).json("deleted successfully");

        }).catch(err => res.status(400).json('Error: ' + err));

});


router.put('/patient/update/:id',passport.authenticate('bearer', { session: false }), async(req, res) => {

    await Patient.findByIdAndUpdate({ _id: req.params.id }, req.body).then(async () => {
        await Patient.findOne({ _id: req.params.id }).then(function (patient) {
            // res.send(patient);
            res.status(200).json("successfully");
        }).catch(err => res.status(400).json('Error: ' + err));
    })

});


router.get('/getAllpatients',passport.authenticate('bearer', { session: false }), async(req, res) => {

    await Patient.find({}).then(function (patients) {    
                
        res.status(200).json(patients);
    }).catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;