const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const config = require('./config/database');

mongoose.connect(config.database);
var db = mongoose.connection; 

mongoose.connection.on('connected', () => {
    console.log('Conneced to database ' + config.database);
})

mongoose.connection.on('error', (err) => {
    console.log('Database error' + err);
});

const app = express();

Song = require('./models/song');
User = require('./models/user');
const users = require('./routes/users');
const songs = require('./routes/songs');

app.use(express.static(path.join(__dirname, 'client')));

app.get('/', (req, res) => {
    res.send('Invaid url');
});

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use('/users', users);
app.use('/songs', songs);

app.listen(3000);
console.log('Running on port 3000');