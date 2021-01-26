const express = require('express');
const router = express.Router();
const User = require("../models/user");
const Role = require("../models/role");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const passport = require('passport');
const multer  = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './img/');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null,file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
      
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });


//add new user
router.post('/user/add/',ensureToken, (req, res) => {

    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {

            res.status(403)

        } else {
            var user = new User(req.body);
            bcrypt.hash(req.body.password, 10, function (err, hash) {
                user.password = hash;
                user.save().then(item => {
                    res.send('hello from server '+req.body);
                    console.log("data saved " + user.password);
                }).catch(err => {
                    console.log(err);
                });
            });
            // setup e-mail data with unicode symbols

        }
    });

});

//get by Id
router.get('/user/:id',ensureToken, (req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {

            res.status(403)

        } else {
            User.findById(req.params.id).populate('work.roles').exec().then(data => {
                res.status(200).json(data);
                // res.send(data); la meme que json(data)
            }).catch(err => res.status(400).json('Error: ' + err));
        }
    });
});

//delete by Id
router.delete('/user/delete/:id',ensureToken, (req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {

            res.status(403)

        } else {

            User.findByIdAndDelete(
                req.params.id, req.body).then(function () {
                    res.status(200).json("user deleted successfully");

                }).catch(err => res.status(400).json('Error: ' + err));
        }

    })

});

//update by Id
router.put('/user/update/:id',ensureToken, (req, res) => {

    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {

            res.status(403)

        } else {
            bcrypt.hash(req.body.password, 10, function (err, hash) {
                this.object = req.body;
                this.object.password = hash;
                console.log("body   " + this.object.password);
                req.body = this.object
                User.findByIdAndUpdate(req.params.id, req.body).then(function (user) {

                    res.status(200).json(
                        req.body,
                    );
                    // res.send();
                }).catch(err => res.status(400).json('Error: ' + err));
            })

        }
    });

});

//get All users
router.get('/getAllusers',ensureToken, (req, res) => {

    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {

            res.status(403)

        } else {
            User.find().populate('work.roles').exec().then(function (users) {
                res.status(200).json(users);
            }).catch(err => res.status(400).json('Error: ' + err));
        }
    });


});

//Upload single image and add it to a user
router.post('/upload/:idUser', upload.single('image'), (req, res, next) => {
    User.findByIdAndUpdate(req.params.idUser, {image : req.file.path} ).then(data => {
        res.send(data);
    })
});

//get All users
router.get('/getAllRoles',ensureToken, (req, res) => {

    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {

            res.status(403)

        } else {
            Role.find().exec().then(function (roles) {
                res.status(200).json(roles);
            }).catch(err => res.status(400).json('Error: ' + err));
        }
    });

});

//login
router.post('/user/login/', (req, res) => {

    User.findOne({
        email: req.body.email
    }).populate('work.roles').then(user => {
        //if user not exist then return status 400
        if (!user) return res.status(400).json({
            message: "Please verify your e-mail or password."
         })
        bcrypt.compare(req.body.password, user.password, (err, data) => {
            //if error than throw error
            if (err) throw err
            //if both match then you can do anything
            if (data) {
                const data1 = {
                    _id: user._id,
                    email: user.email,
                    roles: user.roles
                }
                var token = jwt.sign(data1, 'secret');
                return res.status(200).json({
                    token: token,
                    message: "Welcome back, to aa"
                })
            } else {
                return res.status(401).json({
                    message: "Please verify your e-mail or password."
                })
            }

        })

    })

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

// sign in with passport

loginWithPassport = (req, res, next) => {
    return passport.authenticate('local', {
        session: false
    }, (err, passportUser, info) => {
        if (err) {
            return next(err);
        }

        if (passportUser) {
            console.log(passportUser);

            const user = passportUser;
            const token = jwt.sign({
                email: passportUser.email,
                userId: passportUser._id
            },
                process.env.JWT_KEY, {
                expiresIn: "1h"
            }
            );
            user.token = token

            return res.status(200).json({
                firstName: passportUser.firstName,
                lastName: passportUser.lastName,
                email: passportUser.email,
                token: token
            });
        }
        return res.status(400).json(info);
    })(req, res, next);

}


router.post('/loginWithPassport', loginWithPassport);

module.exports = router;