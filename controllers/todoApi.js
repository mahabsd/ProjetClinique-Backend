const express = require('express');
const router = express.Router();
const Todo = require("../models/todoSchema")
const passport = require('passport');

router.post('/todo/add', passport.authenticate('bearer', { session: false }), (req, res) => {

    let todo = new Todo(req.body);
    todo.save().then(function () {
        res.json(todo);
    }).catch(err => res.status(400).json('Error: ' + err));

});

//get todo by ID
router.get('/todo/:id', passport.authenticate('bearer', { session: false }), (req, res) => {
    Todo.findById(req.params.id).then(data => {
        res.status(200).json(data);
    }).catch(err => res.status(400).json('Error: ' + err));

});

//update todo by ID
router.put('/todo/update/:id', passport.authenticate('bearer', { session: false }), (req, res) => {
    Todo.findByIdAndUpdate(req.params.id, req.body).then(function () {
        res.status(200).json(req.body);
    }).catch(err => res.status(400).json('Error: ' + err));

})

//delete todo by ID
router.delete('/todo/delete/:id', passport.authenticate('bearer', { session: false }), (req, res) => {
    Todo.findByIdAndDelete(req.params.id, req.body).then(() => {
        res.status(200).json("user deleted successfully");
    }).catch(err => res.status(400).json('Error: ' + err));

})
//get All todo by ID
router.get('/getAllTodos', passport.authenticate('bearer', { session: false }), (req, res) => {
    Todo.find().then(function (todo) {
        res.status(200).json(todo);
    }).catch(err => res.status(400).json('Error: ' + err));

})

module.exports = router;