const express = require('express');
const router = express.Router();
const Maintenance = require("../models/maitenance")
const jwt = require("jsonwebtoken");




router.post('/maitenance/add/', ensureToken, async (req, res, next) => {
    jwt.verify(req.token, process.env.JWT_KEY, async (err, data) => {
        if (err)
            res.status(403).json({
                message: "forbidden"
            })
        else {
            await Maintenance.create(req.body).then(function (maitenance) {
                res.send(maitenance);
                res.status(200).json(" successfully");
            }).catch(next);
        }
    });
});


router.get('/maitenance/:id',ensureToken, async(req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY,async (err) => {
        if (err) {

            res.status(403).json({
                message: "forbidden"
            })
        } else {
            await Maintenance.findOne({ _id: req.params.id }) // key to populate
            .then(maitenance=> {
                res.json(maitenance);
                res.status(200).json(" successfully");
                // res.send(data); la meme que json(data)
            }).catch(err => res.status(400).json('Error: ' + err));
        }
    });
});


router.delete('/maitenance/delete/:id',ensureToken, async (req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY, async(err) => {
        if (err) {

            
            res.status(403).json({
                message: "forbidden"
            })

        } else {

            await Maintenance.findByIdAndRemove({ _id: req.params.id }).then(function (maitenance) {
                res.send(maitenance);
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
            await Maintenance.findByIdAndUpdate({ _id: req.params.id }, req.body).then(async () => {
                await Maintenance.findOne({ _id: req.params.id }).then(function (maitenance) {
                    res.send(maitenance);
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
            await Maintenance.find({}).then(function (maitenances) {
                
                res.send(maitenances)
                res.status(200).json(" successfully");
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