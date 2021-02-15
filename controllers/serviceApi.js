const express = require('express');
const router = express.Router();
const Service = require("../models/service")
const jwt = require("jsonwebtoken");
const passport = require('passport');



router.post('/service/add/', passport.authenticate('bearer', { session: false }), async (req, res, next) => {
    await Service.create(req.body).then(function (service) {
        // res.send(service);
        res.status(200).json(" successfully");
    }).catch(next);
});


router.get('/service/:id', passport.authenticate('bearer', { session: false }), async(req, res) => {
    await Service.findOne({ _id: req.params.id }) // key to populate
    .then(service=> {
        res.json(service);
        res.status(200).json(" successfully");
        // res.send(data); la meme que json(data)
    }).catch(err => res.status(400).json('Error: ' + err));
});


router.delete('/service/delete/:id', passport.authenticate('bearer', { session: false }), async (req, res) => {
    await Service.findByIdAndRemove({ _id: req.params.id }).then(function (service) {
        res.send(service);
        res.status(200).json("deleted successfully");

        }).catch(err => res.status(400).json('Error: ' + err));

});


router.put('/service/update/:id', passport.authenticate('bearer', { session: false }), async(req, res) => {

    await Service.findByIdAndUpdate({ _id: req.params.id }, req.body).then(async () => {
        await Service.findOne({ _id: req.params.id }).then(function (service) {
            res.send(service);
            res.status(200).json("successfully");
        }).catch(err => res.status(400).json('Error: ' + err));
    })

});


router.get('/getAllservices', passport.authenticate('bearer', { session: false }), async(req, res) => {

    await Service.find({}).then(function (services) {
                
        res.send(services)
        res.status(200).json(" successfully");
    }).catch(err => res.status(400).json('Error: ' + err));


});


module.exports = router;