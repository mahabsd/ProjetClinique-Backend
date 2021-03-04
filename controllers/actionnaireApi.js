const express = require('express');
const router = express.Router();
const Actionnaire = require("../models/actionnaire")
const passport = require('passport');

router.post('/actionnaire/add',  passport.authenticate('bearer', { session: false }), (req, res) => {

    let actionnaire = new Actionnaire(req.body);
            actionnaire.save().then(function () {
                res.status(200).json(actionnaire);
            }).catch(err => res.status(400).json('Error: ' + err));

});

//get actionnaire by ID
router.get('/actionnaire/:id',  passport.authenticate('bearer', { session: false }), (req, res) => {
    Actionnaire.findById(req.params.id).populate('userActionnaire').exec().then(data => {
         res.status(200).json(data);
     }).catch(err => res.status(400).json('Error: ' + err));

});

//update actionnaire by ID
router.put('/actionnaire/update/:id',  passport.authenticate('bearer', { session: false }), (req, res) => {
    Actionnaire.findByIdAndUpdate(req.params.id, req.body).then(function () {
         res.status(200).json(req.body);
     }).catch(err => res.status(400).json('Error: ' + err));

})

//delete actionnaire by ID
router.delete('/actionnaire/delete/:id',  passport.authenticate('bearer', { session: false }), (req, res) => {
    Actionnaire.findByIdAndDelete(req.params.id).then(() => {
        res.send();
        res.status(200).json("actionnaire deleted successfully");
    }).catch(err => res.status(400).json('Error: ' + err));

})
//get All actionnaire by ID
router.get('/getAllActionnaires',  passport.authenticate('bearer', { session: false }), (req, res) => {
    Actionnaire.find().populate('userActionnaire').exec().then(function (actionnaire) {
        // res.send()
         res.status(200).json(actionnaire);
     }).catch(err => res.status(400).json('Error: ' + err));
  

});

//affect id user for every actionnaire 
router.put('/affectuserActionnaire/:idUser/:idActionnaire', passport.authenticate('bearer', { session: false }),async (req, res) => {

    Actionnaire.findByIdAndUpdate(req.params.idActionnaire, {
        $push: {
            userActionnaire: req.params.idUser
        }
    }).then((actionnaire) => {
        res.status(200).json(actionnaire);

    }).catch(err => res.status(400).json('Error: ' + err));
    
   
});
//splice  id user for every actionnaire 
router.delete('/deleteuserActionnaire/:idUser/:idActionnaire',  passport.authenticate('bearer', { session: false }), (req, res) => {
    Actionnaire.findByIdAndUpdate(req.params.idActionnaire, {
        $pull: {
            userActionnaire: req.params.idUser
        }
    }).then((actionnaire) => {
        res.status(200).json(actionnaire);
    }).catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;