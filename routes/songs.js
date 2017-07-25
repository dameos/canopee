const express = require('express');
const router = express.Router();

router.get('/allSongs', (req, res) => {
    Song.getSongs((err, songs) => {
        if(err) {
            console.log(err);
        } else {
            res.render('songs', {songs:songs});
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
    console.log(song);
    Song.addSong(song, (err, song) => {
        if(err){
            throw err;
        }
        res.redirect('/');
    });
});


module.exports = router;