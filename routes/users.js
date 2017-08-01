const express = require('express');
const store = require('store');
const router = express.Router();

router.get('/getAllUsers', (req, res) => {
    User.getUsers((err, users) => {
        if (err) {
            throw err;
        }
        res.json(users);
    });
});

router.post('/register', (req, res) => {
    var user = req.body;
    User.addUser(user, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Error on register user' });
        } else {
            res.redirect('login');
        }
    });
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password
    User.getUserByUsername(username, (err, userR) => {
        if (err) {
            throw err;
        }
        if (!userR) {
            return res.render('loginError');
        } else {
            var userRID = userR._id;
            store.set('userID', {userID: userRID});
            if (password == userR.password) {
                Song.getSongs((err, songs) => {
                    if (err) {
                        throw err;
                    } else {
                        res.render('songs', { songs: songs, title: 'Songs' });
                    }
                });
            } else {
                return res.json({ success: false, msg: 'Wrong password' });
            }
        }
    });
});

router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;