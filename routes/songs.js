const express = require('express');
const store = require('store');
const router = express.Router();

router.get('/allSongs', (req, res) => {
    Song.getSongs((err, songs) => {
        if (err) {
            throw err;
        } else {
            console.log(store.get('holi').name);
            res.render('songs', { songs: songs });
        }
    });
});

router.post('/addSong', (req, res) => {
    var song = {
        songName: req.body.songName,
        songAuthor: req.body.songAuthor,
        songDuration: req.body.songDuration,
        songImageUrl: req.body.songImageUrl
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
        if(err){
            throw err;
        } else {
            res.render('songs', {songs:songs});
        }
    });
});


module.exports = router;