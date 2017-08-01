const express = require('express');
const store = require('store');
const router = express.Router();

router.get('/allSongs', (req, res) => {
    Song.getSongs((err, songs) => {
        if (err) {
            throw err;
        } else {
            res.render('songs', {title:'Songs', songs: songs });
        }
    });
});

router.post('/addSong', (req, res) => {
    var userID = store.get('userID').userID;
    var song = {
        songName: req.body.songName,
        songAuthor: req.body.songAuthor,
        songDuration: req.body.songDuration,
        songImageUrl: req.body.songImageUrl,
        songOwner: userID
    };
    Song.addSong(song, (err, song) => {
        if(err){
            throw err;
        }
        res.render('addSong');
    });
});

router.get('/addSong', (req, res) => {
    res.render('addSong');
});

router.post('/getSongByName', (req, res) => {
    Song.getSongByName(req.body.songName, (err, songs) =>{
        if(err) {
            throw err;
        } else {
            res.render('songs', {title: 'Songs', songs: songs });
        }
    });
});

router.get('/mySongs', (req, res) => {
    var userID = store.get('userID').userID;
    Song.getSongByOwner(userID, (err, songs) => {
        if(err) {
            throw err; 
        } else {
            res.render('songs', {title: 'My songs', songs: songs});
        }
    });
});

module.exports = router;