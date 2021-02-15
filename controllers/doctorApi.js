const express = require('express');
const router = express.Router();
const Doctor = require("../models/doctor")
const passport = require('passport');

router.post('/doctor/add', passport.authenticate('bearer', { session: false }), (req, res) => {
    var doctor = new Doctor(req.body);
            doctor.save().then(function () {
                console.log(doctor);
                res.json(doctor);
            }).catch(err => res.status(400).json('Error: ' + err));

});

//get doctor by ID
router.get('/doctor/:id',  passport.authenticate('bearer', { session: false }), (req, res) => {
    Doctor.findById(req.params.id).populate('userDoctor').exec().then(data => {
        // res.send();
         res.status(200).json(data);
     }).catch(err => res.status(400).json('Error: ' + err));

});

//update doctor by ID
router.put('/doctor/update/:id',  passport.authenticate('bearer', { session: false }), (req, res) => {
    Doctor.findByIdAndUpdate(req.params.id, req.body).then(function () {
        //  res.send();
          res.status(200).json(req.body);
      }).catch(err => res.status(400).json('Error: ' + err));

})

//delete doctor by ID
router.delete('/doctor/delete/:id',  passport.authenticate('bearer', { session: false }), (req, res) => {
    Doctor.findByIdAndDelete(req.params.id).then(() => {
        // res.send();
         res.status(200).json("doctor deleted successfully");
     }).catch(err => res.status(400).json('Error: ' + err));

})
//get All doctor by ID
router.get('/getAllDoctors',  passport.authenticate('bearer', { session: false }), (req, res) => {
    Doctor.find().populate('userDoctor').exec().then(function (doctor) {
        //  res.send()
          res.status(200).json(doctor);
      }).catch(err => res.status(400).json('Error: ' + err));

});

//affect id user for every doctor 
router.put('/affectuserDoctor/:idUser/:idDoctor', passport.authenticate('bearer', { session: false }), (req, res) => {

    Doctor.findByIdAndUpdate(req.params.idDoctor, {
        $push: {
            userDoctor: req.params.idUser
        }
    }).then((doctor) => {
        res.status(200).json(doctor);

    }).catch(err => res.status(400).json('Error: ' + err));
    
   
});
//splice  id user for every doctor 
router.delete('/deleteuserDoctor/:idUser/:idDoctor',  passport.authenticate('bearer', { session: false }), (req, res) => {
    Doctor.findByIdAndUpdate(req.params.idDoctor, {
        $pull: {
            userDoctor: req.params.idUser
        }
    }).then((doctor) => {
        res.status(200).json(doctor);
    }).catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;