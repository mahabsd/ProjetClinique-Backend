const express = require('express');
const router = express.Router();
const User = require("../models/user");
const Role = require("../models/role");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const passport = require('passport');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './img/');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
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
router.post('/user/add/', [upload.single('image'), ensureToken], (req, res) => {

    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {
            res.status(403)
        } else {
            
            console.log(req.file);
            console.log(req.body);

            var user = new User( {
                username:req.body.username,
                password: req.body.password,
                profile: {
                    name:req.body.profile.name,
                    surname: req.body.profile.surname,
                    birthday:  req.body.profile.birthday,
                    gender: req.body.profile.gender,
                    image: req.file.path,
                },
                work: {
                    company: req.body.work.company,
                    roles:  req.body.work.roles,
                    soldeConge: req.body.work.soldeConge ,
                },
                contacts: {
                    email:req.body.email,
                    phone:req.body. phone,
                    address:req.body.address,
                },
                social: {
                    facebook:req.body. facebook,
                    twitter:req.body.twitter ,
                    google: req.body.google,
                },
                settings: {
                    registrationDate: req.body.registrationDate,
                    joinedDate: req.body.joinedDate,
                    bgColor: req.body.bgColor
                }
            });

            bcrypt.hash(req.body.password, 10, function (err, hash) {
                user.password = hash;
                //  user.profile.image = req.file.mimetype
                //  console.log( user.profile.image );
                user.save().then(item => {
                    res.send('user added successfully ');
                }).catch(err => {
                    console.log(err);
                });
            });
        }
    });

});

//get by Id
router.get('/user/:id', ensureToken, (req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {

            res.status(403)

        } else {
            User.findById(req.params.id).populate('work.roles').exec().then(data => {
                res.status(200).json(data);
            }).catch(err => res.status(400).json('Error: ' + err));
        }
    });
});

//delete by Id
router.delete('/user/delete/:id', ensureToken, (req, res) => {
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
router.put('/user/update/:id', ensureToken, (req, res) => {

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
router.get('/getAllusers', ensureToken, (req, res) => {

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
router.post('/upload/', upload.single('image'), (req, res, next) => {
    console.log(req.file.path);
    res.status(200).json({ message: "uploaded successfully" });
    // User.findByIdAndUpdate(req.params.idUser, {profile: {image : req.file.path} } ).then(data => {
    //     res.send({success : true, status : 'uploaded successfully'});
    // })

});

//get All users
router.get('/getAllRoles', ensureToken, (req, res) => {

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

    User.findOne(
        { "contacts.email": req.body.email }, function (err, obj) { console.log(obj); }
    ).populate('work.roles').then(user => {
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
                    roles: user.work.roles,
                    soldeConge: user.work.soldeConge
                }
                var token = jwt.sign(data1, 'secret');
                return res.status(200).json({
                    token: token,
                    user,
                    message: "Welcome back, to okba"
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