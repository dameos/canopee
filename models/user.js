const mongoose = require('mongoose');

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = mongoose.Schema({
    username:{
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        trim: true,
        lowercase: true,
        validate: [validateEmail, 'Please a valid email address'],
        required: true
    },
    create_date:{
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;

module.exports.getUsers = (callback, limit) => {
    User.find(callback).limit(limit);
}

module.exports.getUserByUsername = (username, callback) => {
    const query = {username: username};
    User.findOne(query,callback);
}

module.exports.addUser = (user, callback) => {
    User.create(user, callback);
}
