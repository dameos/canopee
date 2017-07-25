const mongoose =  require('mongoose');

const songSchema = mongoose.Schema({
    songName:{
        type: String,
        required: true
    },
    songAuthor:{
        type: String,
        required: true
    },
    songDuration:{
        type: String,
        required: true
    },
    songImageUrl:{
        type: String,
    },
    create_date:{
        type: Date,
        default: Date.now
    }
});

var Song = mongoose.model('Song', songSchema, 'songs');
module.exports = Song;

module.exports.getSongs = (callback, limit) => {
    Song.find(callback).limit(limit);
}

module.exports.getSongByName = (songName, callback) => {
    const query = {songName: songName};
    Song.findOne(query, callback);
}

module.exports.addSong = (song, callback) => {
    Song.create(song, callback);
}