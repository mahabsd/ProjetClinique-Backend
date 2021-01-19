const express = require('express');
const router = express.Router();
const Conge = require("../models/congé")
const jwt = require("jsonwebtoken");




router.post('/conge/add/', ensureToken, async (req, res, next) => {
    jwt.verify(req.token, process.env.JWT_KEY, async (err, data) => {
        if (err)
            res.status(403).json({
                message: "forbidden"
            })
        else {
            await Conge.create(req.body).then(function (conge) {
                res.send(conge);
                res.status(200).json(" successfully");
            }).catch(next);
        }
    });
});


router.get('/conge/:id',ensureToken, async(req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY,async (err) => {
        if (err) {

            res.status(403).json({
                message: "forbidden"
            })
        } else {
            await Conge.findOne({ _id: req.params.id }) // key to populate
            .then(Conge => {
                res.json(Conge);
                res.status(200).json(" successfully");
                // res.send(data); la meme que json(data)
            }).catch(err => res.status(400).json('Error: ' + err));
        }
    });
});


router.delete('/conge/delete/:id',ensureToken, async (req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY, async(err) => {
        if (err) {

            
            res.status(403).json({
                message: "forbidden"
            })

        } else {

            await Conge.findByIdAndRemove({ _id: req.params.id }).then(function (conge) {
                res.send(conge);
                res.status(200).json("deleted successfully");

                }).catch(err => res.status(400).json('Error: ' + err));
        }

    })

});


router.put('/conge/update/:id',ensureToken, async(req, res) => {

    jwt.verify(req.token, process.env.JWT_KEY, async(err) => {
        if (err) {

            res.status(403).json({
                message: "forbidden"
            })

        } else {
            await Conge.findByIdAndUpdate({ _id: req.params.id }, req.body).then(async () => {
                await Conge.findOne({ _id: req.params.id }).then(function (conge) {
                    res.send(conge);
                    res.status(200).json("successfully");
                }).catch(err => res.status(400).json('Error: ' + err));
            })

        }
    });

});


router.get('/getAllconges',ensureToken, async(req, res) => {

    jwt.verify(req.token, process.env.JWT_KEY, async(err) => {
        if (err) {

            res.status(403).json({
                message: "forbidden"
            })

        } else {
            await Conge.find({}).then(function (conges) {
                
                res.send(conges)
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