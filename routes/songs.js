const express = require('express');
const router = express.Router();

router.get('/allSongs', (req, res) => {
    Song.getSongs((err, songs) => {
        if(err) {
            console.log(err);
        }
        res.json(songs);
    });
});

router.post('/addSong', (req, res) => {
    var song = req.body;
    Song.addSong(song, (err, song) => {
        if(err){
            throw err;
        }
        res.json(song);
    });
});

module.exports = router;