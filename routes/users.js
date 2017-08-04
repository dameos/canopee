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
            res.locals.loggedIn = true;
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

router.get('/profile', (req, res) => {
    try {
        var userID = store.get('userID').userID;
        User.getUserById(userID, (err, user) =>{
            if(err) {
                throw err;
            } else {
                if(user) {
                    res.render('profile', { user: user});
                } else {
                    res.render('error', {err: 'Please login to see your profile'});
                }
            }
        });
    } catch (err) {
        res.render('error', {err: 'Please login to see your profile'});
    }
});

router.get('/deleteUser', (req, res) => {
    try {
        var userID = store.get('userID').userID;
        User.deleteUser(userID, (err, result) => {
            if(err) {
                throw err;
            } else {
                console.log(result);
                userID = null;
                Song.getSongs((err, songs) => {
                    if (err) {
                        res.render('error', { err: err });
                        throw err;
                    } else {
                        res.render('songs', { title: 'Songs', songs: songs });
                    }
    });
            }
        });
    } catch (err) {
        res.render('error', {err: 'There was an error, good luck trying to solve it'});
    }
});

router.get('/updateUser', (req, res) => {
    res.render('updateUser');
});

router.post('/updateUser', (req, res) => {
    try {
        const userID = store.get('userID').userID;
        const user = req.body;
        User.getUserById(userID, (err, result) => {
            if(err) {
                throw err;
            } else {
                result.username = user.username || result.username;
                result.password = user.password || result.username;
                result.email    = user.email    || result.email;
                result.save((err, result) => {
                    if(err) {
                        throw err;
                    } else {
                        res.render('profile', {user: result});
                    }
                });
            }
        })
    } catch (err) {
        res.render('error', {err: 'There was an error'});
    }
    
});

module.exports = router;