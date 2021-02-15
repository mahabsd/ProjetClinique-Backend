const express = require('express');
const router = express.Router();
const Maintenance = require("../models/maitenance")
const passport = require('passport');



router.post('/maintenance/add/',  passport.authenticate('bearer', { session: false }), async (req, res, next) => {
    await Maintenance.create(req.body).then(function (patient) {
                
        res.status(200).json(patient);
    }).catch(next);
});


router.get('/maintenance/:id', passport.authenticate('bearer', { session: false }), async(req, res) => {
    await Maintenance.findOne({ _id: req.params.id }) // key to populate
            .then(patient=> {
                // res.json(patient);
                res.status(200).json(" successfully");
                // res.send(data); la meme que json(data)
            }).catch(err => res.status(400).json('Error: ' + err));
});


router.delete('/maintenance/delete/:id',passport.authenticate('bearer', { session: false }), async (req, res) => {
    await Maintenance.findByIdAndRemove({ _id: req.params.id }).then(function (patient) {
        // res.send(patient);
        res.status(200).json("deleted successfully");

        }).catch(err => res.status(400).json('Error: ' + err));

});


router.put('/maintenance/update/:id',passport.authenticate('bearer', { session: false }), async(req, res) => {

    await Maintenance.findByIdAndUpdate({ _id: req.params.id }, req.body).then(async () => {
        await Maintenance.findOne({ _id: req.params.id }).then(function (patient) {
            // res.send(patient);
            res.status(200).json("successfully");
        }).catch(err => res.status(400).json('Error: ' + err));
    })

});

router.get('/getAllmaintenances',passport.authenticate('bearer', { session: false }), async(req, res) => {

    await Maintenance.find({}).then(function (maitenances) {
                
        // res.send()
         res.status(200).json(maitenances);
     }).catch(err => res.status(400).json('Error: ' + err));


});




module.exports = router;