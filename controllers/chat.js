const express = require('express');
const router = express.Router();
const Chat = require('../models/chat');
const passport = require('passport');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: async function (req, file, cb) {
        const fileName = Date.now() + path.extname(file.originalname);
        const chat = await Chat.findById(req.params.idChat);
        const io = req.app.get('io');
        const filePath = "https://okbaclinical-backend.herokuapp.com/uploads/" + fileName;
        const message = {
            logo: req.body.logo,
            candidat: req.body.candidat,
            files: [filePath]
        }
        const chat2 = await Chat.findByIdAndUpdate(chat._id, { $push: { messages: message } })
        io.emit('newMessageSended', chat2);
        cb(null, fileName)
    }
})
const upload = multer({ storage: storage });

router.post('/sendMessage/:idChat', [upload.array('myFiles', 12), passport.authenticate('bearer', { session: false })], async (req, res) => {

    if ((req.body.content !== null && req.body.content !== undefined)||(req.file != null)) {
        const chat = await Chat.findById(req.params.idChat);
        const io = req.app.get('io');
        const message = {
            content: req.body.content,
            logo: req.body.logo,
            candidat: req.body.candidat,
        }
        const chat2 = await Chat.findByIdAndUpdate(chat._id, { $push: { messages: message } })
        io.emit('newMessageSended', chat2);
    }

    res.json({ message: 'sent' })
});

router.get('/getPrivateMessage/:idCandidat1/:idCandidat2', passport.authenticate('bearer', { session: false }), function (req, res) {
    Chat.findOne({ candidat1: req.params.idCandidat1, candidat2: req.params.idCandidat2 }, function (err, chat1) {
        if (err) {
            res.send(err);
        }
        if (!chat1) {
            Chat.findOne({ candidat1: req.params.idCandidat2, candidat2: req.params.idCandidat1 }, function (err2, chat2) {
                if (err2) {
                    res.send(err2);
                }
                if (!chat2) {
                    let chat = new Chat({ candidat1: req.params.idCandidat1, candidat2: req.params.idCandidat2, messages: [] });
                    chat.save(function (err3, chat) {
                        if (err3) {
                            res.send(err3)
                        }
                        res.send(chat);
                    });
                } else {
                    res.send(chat2);
                }
            }).populate('candidat1').populate('candidat2')

        } else {
            res.send(chat1);
        }
    }).populate('candidat1').populate('candidat2');

});

//delete chat :

router.get('/deleteChat/:chatId/', passport.authenticate('bearer', { session: false }), function (req, res) {

    Chat.findByIdAndDelete(
        req.params.chatId, req.body).then(function () {
            res.status(200).json("user deleted successfully");

        }).catch(err => res.status(400).json('Error: ' + err));


})

module.exports = router;