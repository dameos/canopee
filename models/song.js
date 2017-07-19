var mongoose =  require('mongoose');

var songSchema = mongoose.Schema({
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
    create_date:{
        type: Date,
        default: Date.now
    }
});

var Song = module.exports = mongoose.model('Song', songSchema);

module.exports.getSongs = function(callback, limit){
    Song.find(callback).limit(limit);
}