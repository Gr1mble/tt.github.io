const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const UserModel = require('./user-model');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
mongoose.connect("mongodb+srv://GrimbleTT:K1rkw00d!5409@nchq.bi3fqgw.mongodb.net/userdb?retryWrites=true&w=majority")
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(() => {
        console.log('Failed to connect to MongoDB');
    });

    module.exports = app;

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Modules', 'GET, POST, PUT, DELETE, OPTIONS');
    console.log("Headers work");
    next();
});

app.get('/signup', function(req, res, next) {
    res.send("Got");
    next();
});

app.post('/signup', (req, res, next) => {

    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const userModel = new UserModel({
                username: req.body.username,
                password: hash,
                email: req.body.email,
                phonenumber: req.body.phonenumber,
                games: req.body.games,
                emailCheck: req.body.emailCheck,
                sms: req.body.sms
            })

            userModel.save()
            console.log("User Created!");
            
        })
        next();
}); 