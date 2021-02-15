const express = require('express');
const router = express.Router();
const Conge = require("../models/conge")
const jwt = require("jsonwebtoken");
var passport = require('passport');



router.post('/conge/add/', passport.authenticate('bearer', { session: false }), async (req, res, next) => {
    
            await Conge.create(req.body).then(function (conge) {
               // res.send();
                res.status(200).json(" successfully"+ conge);
       
});


router.get('/conge/:id',passport.authenticate('bearer', { session: false }), async(req, res) => {
   
            await Conge.findOne({ _id: req.params.id }).populate('userOwner')// key to populate
            .then(Conge => {
              //  res.json();
                res.status(200).json(Conge);
                // res.send(data); la meme que json(data)
            }).catch(err => res.status(400).json('Error: ' + err));
     
});


router.delete('/conge/delete/:id',passport.authenticate('bearer', { session: false }), async (req, res) => {
    
            await Conge.findByIdAndRemove({ _id: req.params.id }).then(function (conge) {
                //res.send(conge);
                res.status(200).json("deleted successfully");

                }).catch(err => res.status(400).json('Error: ' + err));
     
});


router.put('/conge/update/:id',passport.authenticate('bearer', { session: false }), async(req, res) => {

    
       
            await Conge.findByIdAndUpdate({ _id: req.params.id }, req.body).then(async () => {
                await Conge.findOne({ _id: req.params.id }).then(function (conge) {
                  //  res.send(conge);
                    res.status(200).json(conge);
                }).catch(err => res.status(400).json('Error: ' + err));
            })


});


router.get('/getAllconges',passport.authenticate('bearer', { session: false }), async(req, res) => {

   
            await Conge.find({}).populate('userOwner').then(function (conges) {
               // res.send(conges)
                res.status(200).json(conges);
            }).catch(err => res.status(400).json('Error: ' + err));
      
        })
});




module.exports = router;