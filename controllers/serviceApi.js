const express = require('express');
const router = express.Router();
const Service = require("../models/service")
const jwt = require("jsonwebtoken");




router.post('/service/add/', ensureToken, async (req, res, next) => {
    jwt.verify(req.token, process.env.JWT_KEY, async (err, data) => {
        if (err)
            res.status(403).json({
                message: "forbidden"
            })
        else {
            await Service.create(req.body).then(function (service) {
                // res.send(service);
                res.status(200).json(" successfully");
            }).catch(next);
        }
    });
});


router.get('/service/:id',ensureToken, async(req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY,async (err) => {
        if (err) {

            res.status(403).json({
                message: "forbidden"
            })
        } else {
            await Service.findOne({ _id: req.params.id }) // key to populate
            .then(service=> {
                res.json(service);
                res.status(200).json(" successfully");
                // res.send(data); la meme que json(data)
            }).catch(err => res.status(400).json('Error: ' + err));
        }
    });
});


router.delete('/service/delete/:id',ensureToken, async (req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY, async(err) => {
        if (err) {

            
            res.status(403).json({
                message: "forbidden"
            })

        } else {

            await Service.findByIdAndRemove({ _id: req.params.id }).then(function (service) {
                res.send(service);
                res.status(200).json("deleted successfully");

                }).catch(err => res.status(400).json('Error: ' + err));
        }

    })

});


router.put('/service/update/:id',ensureToken, async(req, res) => {

    jwt.verify(req.token, process.env.JWT_KEY, async(err) => {
        if (err) {

            res.status(403).json({
                message: "forbidden"
            })

        } else {
            await Service.findByIdAndUpdate({ _id: req.params.id }, req.body).then(async () => {
                await Service.findOne({ _id: req.params.id }).then(function (service) {
                    res.send(service);
                    res.status(200).json("successfully");
                }).catch(err => res.status(400).json('Error: ' + err));
            })

        }
    });

});


router.get('/getAllservices',ensureToken, async(req, res) => {

    jwt.verify(req.token, process.env.JWT_KEY, async(err) => {
        if (err) {

            res.status(403).json({
                message: "forbidden"
            })

        } else {
            await Service.find({}).then(function (services) {
                
                res.send(services)
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