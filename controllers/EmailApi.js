const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport("SMTP", {
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
router.post('/sendmail', ensureToken,  (req, res) => {

    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {

            res.status(403)

        } else {
                    var mailOptions = {
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
                  
            }
            // setup e-mail data with unicode symbols
            
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