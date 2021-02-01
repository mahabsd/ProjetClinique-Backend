const express = require('express');
const router = express.Router();
const Patient = require("../models/patient")
const jwt = require("jsonwebtoken");
const imgModel = require('../models/imageSchema');

const multer = require('multer');





var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './img/patient');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/gif' || file.mimetype == 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);

    }

}
const upload = multer({ storage: storage, fileFilter: fileFilter });

//Upload route
router.post('/upload', upload.single('images'), async (req, res, next) => {

        var obj = {
            
            img: {
                data: req.files[i].filename,
                contentType: 'image/png' || 'image/jpeg' || 'image/gif'
            },
            path: req.file.path
        }

        await imgModel.create(obj)
    
    try {
        // await res.send(req.file);
        await res.status(200).json("Files uploded successfully"+req.file);
        // return res.json
        // //({
        // //     message: 'Files uploded successfully '

        // // });
    } catch (error) {

        console.error(error);
    }
});


// router.get('/upload/:theImageName', function(req, res){
//     console.log(req.params.theImageName); //returns the imageOfApet.png
//     var theName = req.params.theImageName; //imageOfApet.png
//     res.sendFile( "/img/patients" + theName); //Sending the user the file
//  })





router.post('/patient/add/', ensureToken, async (req, res, next) => {
    jwt.verify(req.token, process.env.JWT_KEY, async (err, data) => {
        if (err)
            res.status(403).json({
                message: "forbidden"
            })
        else {
            await Patient.create(req.body).then(function (patient) {
                
                res.status(200).json(patient);
            }).catch(next);
        }
    });
});


router.get('/patient/:id',ensureToken, async(req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY,async (err) => {
        if (err) {

            res.status(403).json({
                message: "forbidden"
            })
        } else {
            await Patient.findOne({ _id: req.params.id }) // key to populate
            .then(patient=> {
                // res.json(patient);
                res.status(200).json(" successfully");
                // res.send(data); la meme que json(data)
            }).catch(err => res.status(400).json('Error: ' + err));
        }
    });
});


router.delete('/patient/delete/:id',ensureToken, async (req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY, async(err) => {
        if (err) {

            
            res.status(403).json({
                message: "forbidden"
            })

        } else {

            await Patient.findByIdAndRemove({ _id: req.params.id }).then(function (patient) {
                // res.send(patient);
                res.status(200).json("deleted successfully");

                }).catch(err => res.status(400).json('Error: ' + err));
        }

    })

});


router.put('/patient/update/:id',ensureToken, async(req, res) => {

    jwt.verify(req.token, process.env.JWT_KEY, async(err) => {
        if (err) {

            res.status(403).json({
                message: "forbidden"
            })

        } else {
            await Patient.findByIdAndUpdate({ _id: req.params.id }, req.body).then(async () => {
                await Patient.findOne({ _id: req.params.id }).then(function (patient) {
                    // res.send(patient);
                    res.status(200).json("successfully");
                }).catch(err => res.status(400).json('Error: ' + err));
            })

        }
    });

});


router.get('/getAllpatients',ensureToken, async(req, res) => {

    jwt.verify(req.token, process.env.JWT_KEY, async(err) => {
        if (err) {

            res.status(403).json({
                message: "forbidden"
            })

        } else {
            await Patient.find({}).then(function (patients) {
                
                
                res.status(200).json(patients);
            }).catch(err => res.status(400).json('Error: ' + err));
        }
    });


});




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