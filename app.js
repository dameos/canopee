const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/database');


const app = express();

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

app.use(express.static(path.join(__dirname, 'client')));

app.get('/', (req, res) => {
    res.render('login');
});



app.use(cors());
app.use('/users', users);
app.use('/songs', songs);

app.listen(3000);
console.log('Running on port 3000');