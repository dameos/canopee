const express = require('express');
const store = require('store');
const router = express.Router();

router.get('/allSongs', (req, res) => {
    Song.getSongs((err, songs) => {
        if (err) {
            res.render('error', {err: err});
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
        if(err) {
            res.render('error', {err: err});
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
            res.render('error', {err: err});
            throw err;
        } else {
            res.render('songs', {title: 'Songs', songs: songs });
        }
    });
});

router.get('/mySongs', (req, res) => {
    try {
        var userID = store.get('userID').userID;
        Song.getSongByOwner(userID, (error, songs) => {
            if (error) {
                res.render('error', { err: error });
                //throw err; 
            } else {
                res.render('mySongs', { title: 'My songs', songs: songs });
            }
        });
    } catch (err) {
        res.render('error', {err: 'BRING IT ON BITCH'});
    }
});

module.exports = router;