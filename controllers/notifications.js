const express = require('express');
const router = express.Router();
const Notif = require("../models/notification");
const passport = require('passport');


// Send Notification API
router.post('/send-notification', passport.authenticate('bearer', { session: false }), (req, res) => {
    const notify = { data: req.body };
    const io = req.app.get('io');
    io.emit('notification', notify);
    let notif = new Notif(req.body);
    notif.save().then(item => {
        res.json({ message: 'notif sent successfully ' });
    }).catch(err => {
        console.log(err);
    });
});

//get all notif
router.get('/get-notification/', passport.authenticate('bearer', { session: false }), (req, res) => {
    Notif.find().populate("userOwner").populate("reciever").then(data => {
        res.status(200).json(data);
    }).catch(err => res.status(400).json('Error: ' + err));
})

//delete notification
router.delete('/delete/:id', passport.authenticate('bearer', { session: false }), (req, res) => {
    Notif.findByIdAndDelete(req.params.id).then(data => {
        res.status(200).json({ message: 'deleted successfully' });
    }).catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;