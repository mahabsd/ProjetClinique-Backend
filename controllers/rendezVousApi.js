const express = require('express');
const router = express.Router();
const RendezVous = require("../models/RendezVous")
const jwt = require("jsonwebtoken");
const passport = require('passport');

router.post('/rendezVous/add', passport.authenticate('bearer', { session: false }), (req, res) => {

    let rendezVous = new RendezVous(req.body);
    rendezVous.save().then(function () {
        res.json(rendezVous);
    }).catch(err => res.status(400).json('Error: ' + err));

});

//get rendezVous by ID
router.get('/rendezVous/:id', passport.authenticate('bearer', { session: false }), (req, res) => {
 
    RendezVous.findById(req.params.id).populate('userRendezVous').exec().then(data => {
        // res.send();
        res.status(200).json(data);
    }).catch(err => res.status(400).json('Error: ' + err));

});

//update rendezVous by ID
router.put('/rendezVous/update/:id', passport.authenticate('bearer', { session: false }), (req, res) => {
    RendezVous.findByIdAndUpdate(req.params.id, req.body).then(function () {
        //  res.send();
        res.status(200).json(req.body);
    }).catch(err => res.status(400).json('Error: ' + err));

})

//delete rendezVous by ID
router.delete('/rendezVous/delete/:id', passport.authenticate('bearer', { session: false }), (req, res) => {
    RendezVous.findByIdAndDelete(req.params.id).then(() => {
        // res.send();
        res.status(200).json("rendezVous deleted successfully");
    }).catch(err => res.status(400).json('Error: ' + err));

})
//get All rendezVous by ID
router.get('/getAllRendezVous', passport.authenticate('bearer', { session: false }), (req, res) => {
    let response=[];
    RendezVous.find().populate('userRendezVous').exec().then(function (rendezVous) {
        //  res.send()
        rendezVous.forEach(element => {
          let schedule ={
              _id:element._id,
              start: element.start,
              description: element.descrip,
              title:element.title ,
               color: element.color,
               actions:element.actions,
               userOwner:element.userOwner
            }
            response.push(schedule)
        });
        
          res.status(200).json(response);
      }).catch(err => res.status(400).json('Error: ' + err));

});

//affect id user for every rendezVous 
router.put('/affectuserRendezVous/:idUser/:idRendezVous', passport.authenticate('bearer', { session: false }), (req, res) => {

    RendezVous.findByIdAndUpdate(req.params.idRendezVous, {
        $push: {
            userRendezVous: req.params.idUser
        }
    }).then((rendezVous) => {
        res.status(200).json(rendezVous);

    }).catch(err => res.status(400).json('Error: ' + err));


});
//splice  id user for every rendezVous 
router.delete('/deleteuserRendezVous/:idUser/:idRendezVous', passport.authenticate('bearer', { session: false }), (req, res) => {
    RendezVous.findByIdAndUpdate(req.params.idRendezVous, {
        $pull: {
            userRendezVous: req.params.idUser
        }
    }).then((rendezVous) => {
        res.status(200).json(rendezVous);
    }).catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;