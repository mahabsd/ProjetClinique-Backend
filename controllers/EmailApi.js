const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
let passport = require('passport');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport("SMTP", {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: "Gmail",
    auth: {
        user: '****@gmail.com',
        pass: "*****"
    }
});

//add new user
router.post('/sendmail', passport.authenticate('bearer', { session: false }),  (req, res) => {

                    let mailOptions = {
                        from:  '****@gmail.com' ,
                        to: req.body.emailreceiver,
                        subject:  req.body.subject, // Subject line
                        text: req.body.text,
                        // html: '<b> <p>votre session à été crée avec succée, votre mot de passe est : notre site</a></p></b>' // html body 
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            return res.send(error);
                        }
                        return res.send("data saved ");
                    });
          
});




module.exports = router;