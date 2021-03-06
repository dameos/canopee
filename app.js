const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/database');

const app = express();
var port = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect(config.database);
var db = mongoose.connection; 

mongoose.connection.on('connected', () => {
    console.log('Conneced to database ' + config.database);
})

mongoose.connection.on('error', (err) => {
    console.log('Database error' + err);
});

app.set('view engine', 'ejs');

Song = require('./models/song');
User = require('./models/user');
const users = require('./routes/users');
const songs = require('./routes/songs');
app.use('/users', users);
app.use('/songs', songs);


app.use(express.static(path.join(__dirname, 'client')));

app.get('/', (req, res) => {
    res.locals.loggedIn = false; 
    res.redirect('songs/allSongs');
});



app.use(cors());

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});