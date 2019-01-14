require('dotenv').config();

//dependences
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const pollRouter = require('./routes/poll');

//set public folder
app.use(express.static(path.join(__dirname, 'public')));

//Connect to DB
const url = 'mongodb://ds155864.mlab.com:55864/pusherpoll'
mongoose.connect(url, {
    useNewUrlParser: true,
    auth: {
        user: 'admin',
        password: process.env.MONGO_PW
    }
})
    .then( () => {
        console.log('connect to database');
    }, (err) => {
        console.log('Connect to db failed');
        console.log(err);
});

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Enable CORS
app.use(cors());

app.use('/poll', pollRouter);

const port = 3000;

//Start server
app.listen(port, () => console.log(`Server started on port ${port}`));