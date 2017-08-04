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
    try {
        var userID = store.get('userID').userID;
        res.render('addSong');
    } catch (err) {
        res.render('error', {err: 'Please log in to add song'});
    }
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
                res.render('mySongs', { title: 'My songs', songs: songs});
            }
        });
    } catch (err) {
        res.render('error', {err: 'Please login to see your songs'});
    }
});

router.post('/deleteSong', (req, res) => {
    console.log(req.body.songID)
    Song.deleteSong(req.body.songID, (err, result) => {
        if(err) {
            throw err;
        } else {
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
                res.render('error', { err: 'Please login to see your songs' });
            }
        }
    })
});

router.get('/editSong/:id', (req, res) => {
    const id = req.params.id;
    res.render('editSong', {id:id});
});

router.post('/editSong/:id', (req, res) => {
    const songID = req.params.id;
    const song = req.body;
    Song.getSongById(songID, (err, result) => {
        if(err) {
            throw err;
        } else {
            result.songName     = song.songName     || result.songName;
            result.songAuthor    = song.songAuthor   || result.songAuthor;
            result.songDuration = song.songDuration || result.songDuration;
            result.songImageUrl = song.songImageUrl || result.songImageUrl;
            result.save((err, result) => {
                if(err) {
                    throw err;
                } else {
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
                        res.render('error', { err: 'Please login to see your songs' });
                    }
                }
            }) 
        }
    })
})

module.exports = router;