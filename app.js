var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

Song = require('./models/song');

mongoose.connect('mongodb://localhost/canopee');
var db = mongoose.connection; 

app.get('/', function(req, res) {
    res.send('hello World');
});

app.get('/api/songs', function(req, res){
    Song.getSongs(function(err, songs){
        if(err) {
            throw err;
        }
        res.json(songs);
    });
});

app.listen(3000);
console.log('Running on port 3000');