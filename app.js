const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());

Song = require('./models/song');
User = require('./models/user');

mongoose.connect('mongodb://localhost/canopee');
var db = mongoose.connection; 

app.get('/', (req, res) => {
    res.send('Use API');
});

app.get('/api/songs', (req, res) => {
    Song.getSongs((err, songs) => {
        if(err) {
            console.log(err);
        }
        res.json(songs);
    });
});

app.post('/api/songs', (req, res) => {
    var song = req.body;
    Song.addSong(song, (err, song) => {
        if(err){
            throw err;
        }
        res.json(song);
    });
});

app.get('/api/users', (req, res) => {
    User.getUsers((err, users) => {
        if(err) {
            throw err;
        }
        res.json(users);
    });
});

app.post('/api/users', (req, res) => {
    var user = req.body;
    User.addUser(user, (err, user) => {
        if(err){
            throw err;
        }
        res.json(user)
    });
});

app.listen(3000);
console.log('Running on port 3000');