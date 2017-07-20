const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


router.get('/getAllUsers', (req, res) => {
    User.getUsers((err, users) => {
        if(err) {
            throw err;
        }
        res.json(users);
    });
});



router.post('/register', (req, res) => {
    var user = req.body;
    User.addUser(user, (err, user) => {
        if(err){
            res.json({success: false, msg: 'Error on register user'});
        } else {
            res.json({success: true, msg: 'User registered'});
        }
    });
});

router.post('/login', (req, res) => {
    var user = req.body;
    User.logIn(user, (err, userR) => {
        if(err) {
            throw err;
        }
        if(user.password == userR[0].password) {
            res.send('Acces granted');
        } else {
            res.send('Wrong password');
        }
    });
});

module.exports = router;