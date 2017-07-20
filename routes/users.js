const express = require('express');
const router = express.Router();

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
            throw err;
        }
        res.json(user)
    });
});

module.exports = router;