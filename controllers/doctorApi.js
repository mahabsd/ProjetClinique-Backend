const express = require('express');
const router = express.Router();
const Doctor = require("../models/doctor")
const jwt = require("jsonwebtoken");

router.post('/doctor/add', ensureToken, (req, res) => {

    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {
            console.log(err);
            res.status(403)

        } else {
            var doctor = new Doctor(req.body);
            doctor.save().then(function () {
                console.log(doctor);
                res.json(doctor);
            }).catch(err => res.status(400).json('Error: ' + err));
        }
    });

});

//get doctor by ID
router.get('/doctor/:id', ensureToken, (req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {

            res.status(403)

        } else {

            Doctor.findById(req.params.id).populate('userDoctor').exec().then(data => {
               // res.send();
                res.status(200).json(data);
            }).catch(err => res.status(400).json('Error: ' + err));
        }
    });

});

//update doctor by ID
router.put('/doctor/update/:id', ensureToken, (req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {

            res.status(403)

        } else {
            Doctor.findByIdAndUpdate(req.params.id, req.body).then(function () {
              //  res.send();
                res.status(200).json(req.body);
            }).catch(err => res.status(400).json('Error: ' + err));
        }
    });

})

//delete doctor by ID
router.delete('/doctor/delete/:id', ensureToken, (req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {

            res.status(403)

        } else {
            Doctor.findByIdAndDelete(req.params.id).then(() => {
               // res.send();
                res.status(200).json("doctor deleted successfully");
            }).catch(err => res.status(400).json('Error: ' + err));
        }
    });

})
//get All doctor by ID
router.get('/getAllDoctors', ensureToken, (req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {

            res.status(403)

        } else {
            Doctor.find().populate('userDoctor').exec().then(function (doctor) {
              //  res.send()
                res.status(200).json(doctor);
            }).catch(err => res.status(400).json('Error: ' + err));
        }
    });

});

//affect id user for every doctor 
router.put('/affectuserDoctor/:idUser/:idDoctor',ensureToken, (req, res) => {

    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {
            res.status(403)
            console.log( err);

        }else{
            Doctor.findByIdAndUpdate(req.params.idDoctor, {
                $push: {
                    userDoctor: req.params.idUser
                }
            }).then((doctor) => {
                res.status(200).json(doctor);
        
            }).catch(err => res.status(400).json('Error: ' + err));
        }

    });
    
   
});
//splice  id user for every doctor 
router.delete('/deleteuserDoctor/:idUser/:idDoctor', ensureToken, (req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {

            res.status(403)

        } else {
            Doctor.findByIdAndUpdate(req.params.idDoctor, {
                $pull: {
                    userDoctor: req.params.idUser
                }
            }).then((doctor) => {
                res.status(200).json(doctor);
            }).catch(err => res.status(400).json('Error: ' + err));
        }
    });

});
//authentification
function ensureToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {

        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();

    } else {
        console.log(bearerHeader);
        res.sendStatus(401);
    }
};
module.exports = router;