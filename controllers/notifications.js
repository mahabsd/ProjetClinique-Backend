const express = require('express');
const router = express.Router();
const Maintenance = require("../models/maitenance");
const Conge = require("../models/conge");
const Sms = require("../models/sms")
const Chat = require("../models/chat")



// Send Notification API
router.post('/send-notification', (req, res) => {
    const notify = {data: req.body};
    const io = req.router.get('io');
    io.emit('notification', notify); // Updates Live Notification
    res.send(notify);
});



















var notifs = {
    maint: '',
    conge: '',
    sms: '',
    chat: '',
    rendezvous:'',
}
router.get('/notifications', (req, res) => {
    //maintenace
    Maintenance.find({}, function (err, maintenances) {
        maintenances.forEach(function (maintenance) {
            if (maintenance.notifications == false) {

                notifs = {
                    maint: "you have a new maintenance",
                }
            }
        })
       
    }).then(()=>{
        res.status(200).send(notifs)
    }).catch(err => res.status(400).json('Error: ' + err));
    //conge
    // Conge.find({}, function (err, conge) {
    //     conge.forEach(function (conge) {
    //         if (conge.notifications == false) {
    //             notifs = {
    //                 conge: "you have a new days leaves request to validate",
    //             }
    //         }
    //     });
    // })
    //SMS
    // Sms.find({}, function (err, sms) {
    //     sms.forEach(function (sms) {
    //         if (sms.notifications == false) {
    //             notifs = {
    //                 sms: "you have a new sms to validate",
    //             }
    //         }
    //     });
    // })

    //chat
    // Chat.find({}, function (err, chat) {
    //     chat.forEach(function (message) {
    //         if (message.messages.notifications == false) {
    //             notifs = {
    //                 chat: "you have a new message",
    //             }
    //         }
    //     });
    // })


})
module.exports = router;