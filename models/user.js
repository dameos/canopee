var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    create_date:{
        type: Date,
        default: Date.now
    }
});

var User = mongoose.model('User', userSchema, 'users');

module.exports = User;

module.exports.getUsers = (callback, limit) => {
    User.find(callback).limit(limit);
}

module.exports.addUser = (user, callback) => {
    Song.create(user, callback);
}