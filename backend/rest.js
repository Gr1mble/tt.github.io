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


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());


app.get('/signup', function (req, res, next) {
    res.render('/signup');
    next();
});

app.post('/signup', (req, res) => {

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
            });

            userModel.save()

                .then(result => {
                    return res.status(201).json({
                        messege: 'User Created!',
                        result: result
                    })
                })
                .catch(err => {
                    return res.status(500).json({
                        error: err
                    })
                })
        });
});


module.exports = app;


