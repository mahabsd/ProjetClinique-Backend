const express = require('express');
const router = express.Router();
const Todo = require("../models/todoSchema")
const passport = require('passport');

router.post('/todo/add', passport.authenticate('bearer', { session: false }), (req, res) => {

    var todo = new Todo(req.body);
    todo.save().then(function () {
        console.log(todo);
        res.json(todo);
    }).catch(err => res.status(400).json('Error: ' + err));

});

//get todo by ID
router.get('/todo/:id', passport.authenticate('bearer', { session: false }), (req, res) => {
    Todo.findById(req.params.id).then(data => {
        res.send(data);
        res.status(200).json();
    }).catch(err => res.status(400).json('Error: ' + err));

});

//update todo by ID
router.put('/todo/update/:id', passport.authenticate('bearer', { session: false }), (req, res) => {
    Todo.findByIdAndUpdate(req.params.id, req.body).then(function () {
        res.send(req.body);
        res.status(200).json();
    }).catch(err => res.status(400).json('Error: ' + err));

})

//delete todo by ID
router.delete('/todo/delete/:id', passport.authenticate('bearer', { session: false }), (req, res) => {
    Todo.findByIdAndDelete(req.params.id, req.body).then(() => {
        res.send("user deleted successfully");
        res.status(200).json();
    }).catch(err => res.status(400).json('Error: ' + err));

})
//get All todo by ID
router.get('/getAllTodos', passport.authenticate('bearer', { session: false }), (req, res) => {
    Todo.find().then(function (todo) {
        res.send(todo)
        res.status(200).json();
    }).catch(err => res.status(400).json('Error: ' + err));

})

module.exports = router;