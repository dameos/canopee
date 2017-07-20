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
    const username = req.body.username;
    const password = req.body.password
    User.getUserByUsername(username, (err, userR) => {
        if(err) {
            throw err;
        }
        if(!user) {
            return res.json({success: false, msg: 'User not found'});
        } else {
            if(password == userR.password) {
                res.json({success: true, msg: 'Acces granted'});
            } else {
                return res.json({success: false, msg: 'Wrong password'});
            }   
        }
    });
});

module.exports = router;