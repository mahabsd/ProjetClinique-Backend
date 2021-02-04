const express = require('express');
const router = express.Router();
const RendezVous = require("../models/RendezVous")
const jwt = require("jsonwebtoken");

router.post('/rendezVous/add', ensureToken, (req, res) => {

    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {
            console.log(err);
            res.status(403)

        } else {
            var rendezVous = new RendezVous(req.body);
            rendezVous.save().then(function () {
                console.log(rendezVous);
                res.json(rendezVous);
            }).catch(err => res.status(400).json('Error: ' + err));
        }
    });

});

//get rendezVous by ID
router.get('/rendezVous/:id', ensureToken, (req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {

            res.status(403)

        } else {

            RendezVous.findById(req.params.id).populate('userRendezVous').exec().then(data => {
               // res.send();
                res.status(200).json(data);
            }).catch(err => res.status(400).json('Error: ' + err));
        }
    });

});

//update rendezVous by ID
router.put('/rendezVous/update/:id', ensureToken, (req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {

            res.status(403)

        } else {
            RendezVous.findByIdAndUpdate(req.params.id, req.body).then(function () {
              //  res.send();
                res.status(200).json(req.body);
            }).catch(err => res.status(400).json('Error: ' + err));
        }
    });

})

//delete rendezVous by ID
router.delete('/rendezVous/delete/:id', ensureToken, (req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {

            res.status(403)

        } else {
            RendezVous.findByIdAndDelete(req.params.id).then(() => {
               // res.send();
                res.status(200).json("rendezVous deleted successfully");
            }).catch(err => res.status(400).json('Error: ' + err));
        }
    });

})
//get All rendezVous by ID
router.get('/getAllRendezVous', ensureToken, (req, res) => {
    var response=[];
    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {

            res.status(403)

        } else {
            RendezVous.find().populate('userRendezVous').exec().then(function (rendezVous) {
              //  res.send()
              rendezVous.forEach(element => {
                var schedule ={
                    start: element.start,
                   description: element.descrip,
                    title:element.title ,
                     color: element.color,
                     actions:element.actions
                  }
                  response.push(schedule)
              });
              
                res.status(200).json(response);
            }).catch(err => res.status(400).json('Error: ' + err));
        }
    });

});

//affect id user for every rendezVous 
router.put('/affectuserRendezVous/:idUser/:idRendezVous',ensureToken, (req, res) => {

    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {
            res.status(403)
            console.log( err);

        }else{
            RendezVous.findByIdAndUpdate(req.params.idRendezVous, {
                $push: {
                    userRendezVous: req.params.idUser
                }
            }).then((rendezVous) => {
                res.status(200).json(rendezVous);
        
            }).catch(err => res.status(400).json('Error: ' + err));
        }

    });
    
   
});
//splice  id user for every rendezVous 
router.delete('/deleteuserRendezVous/:idUser/:idRendezVous', ensureToken, (req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {

            res.status(403)

        } else {
            RendezVous.findByIdAndUpdate(req.params.idRendezVous, {
                $pull: {
                    userRendezVous: req.params.idUser
                }
            }).then((rendezVous) => {
                res.status(200).json(rendezVous);
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