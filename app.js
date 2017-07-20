const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

Song = require('./models/song');
User = require('./models/user');

const users = require('./routes/users');
const songs = require('./routes/songs');

mongoose.connect('mongodb://localhost/canopee');
var db = mongoose.connection; 

app.get('/', (req, res) => {
    res.send('Use API');
});

app.use(cors());
app.use(bodyParser.json());
app.use('/users', users);
app.use('/songs', songs);

app.listen(3000);
console.log('Running on port 3000');