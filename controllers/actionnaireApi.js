const express = require('express');
const router = express.Router();
const Actionnaire = require("../models/actionnaire")
const jwt = require("jsonwebtoken");

router.post('/actionnaire/add', ensureToken, (req, res) => {

    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {
            console.log(err);
            res.status(403)

        } else {
            var actionnaire = new Actionnaire(req.body);
            actionnaire.save().then(function () {
                // console.log(actionnaire);
                // res.json(actionnaire);
                res.status(200).json(actionnaire);
            }).catch(err => res.status(400).json('Error: ' + err));
        }
    });

});

//get actionnaire by ID
router.get('/actionnaire/:id', ensureToken, (req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {

            res.status(403)

        } else {

            Actionnaire.findById(req.params.id).populate('userActionnaire').exec().then(data => {
               // res.send();
                res.status(200).json(data);
            }).catch(err => res.status(400).json('Error: ' + err));
        }
    });

});

//update actionnaire by ID
router.put('/actionnaire/update/:id', ensureToken, (req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {

            res.status(403)

        } else {
            Actionnaire.findByIdAndUpdate(req.params.id, req.body).then(function () {
               // res.send();
                res.status(200).json(req.body);
            }).catch(err => res.status(400).json('Error: ' + err));
        }
    });

})

//delete actionnaire by ID
router.delete('/actionnaire/delete/:id', ensureToken, (req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {

            res.status(403)

        } else {
            Actionnaire.findByIdAndDelete(req.params.id).then(() => {
                res.send();
                res.status(200).json("actionnaire deleted successfully");
            }).catch(err => res.status(400).json('Error: ' + err));
        }
    });

})
//get All actionnaire by ID
router.get('/getAllActionnaires', ensureToken, (req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {

            res.status(403)

        } else {
            Actionnaire.find().populate('userActionnaire').exec().then(function (actionnaire) {
               // res.send()
                res.status(200).json(actionnaire);
            }).catch(err => res.status(400).json('Error: ' + err));
        }
    });

});

//affect id user for every actionnaire 
router.put('/affectuserActionnaire/:idUser/:idActionnaire',ensureToken, (req, res) => {

    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {
            res.status(403)
            console.log( err);

        }else{
            Actionnaire.findByIdAndUpdate(req.params.idActionnaire, {
                $push: {
                    userActionnaire: req.params.idUser
                }
            }).then((actionnaire) => {
                res.status(200).json(actionnaire);
        
            }).catch(err => res.status(400).json('Error: ' + err));
        }

    });
    
   
});
//splice  id user for every actionnaire 
router.delete('/deleteuserActionnaire/:idUser/:idActionnaire', ensureToken, (req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {

            res.status(403)

        } else {
            Actionnaire.findByIdAndUpdate(req.params.idActionnaire, {
                $pull: {
                    userActionnaire: req.params.idUser
                }
            }).then((actionnaire) => {
                res.status(200).json(actionnaire);
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