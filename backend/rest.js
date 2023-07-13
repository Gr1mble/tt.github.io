const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const UserModel = require('./user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();


// Database Connection

mongoose.connect("mongodb+srv://GrimbleTT:K1rkw00d!5409@nchq.bi3fqgw.mongodb.net/userdb?retryWrites=true&w=majority")
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(() => {
        console.log('Failed to connect to MongoDB');
    });

// End of Database Connection


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Modules', 'GET, POST, PUT, DELETE, OPTIONS');
    console.log("Headers work");
    next();
});


// App Uses / Sets

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

// End of App Uses


// Routes

app.get('/', function (req, res) {
    res.send('GET Request to Home');
});

app.get('/signup', function (req, res) {
    res.send('GET Request to Signup');
});

app.get('/signin', function (req, res) {
    res.send('GET Request to Signin');
});


// End of Routes


// POST Requests


app.post('/signup', (req, res) => {

    try {
        bcrypt.hash(req.body.password, 10)

            .then(function (hash) {
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
                        console.log(result + "User Created!");
                        return res.send({ message: 'User Created!' })
                        //mongoose.connection.close();
                    })
                    .catch(err => {
                        console.log(err + " Failed to Create User!");
                    })
            })
    } catch (error) {
        console.log(error + "Failed to Create User!");
    }


});

app.post('/signin', (req, res) => {

    let userFound;

    UserModel.findOne({ username: req.body.username })
        .then(user => {
            if (!user) {
                return res.send({message: 'User Not Found!'});
            };

            userFound = user;

            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            if (!result) {
                return res.send({messege: 'Password is Incorrect!'});
            };

            const token = jwt.sign({ username: userFound.username, userId: userFound._id }, "secret_string", { expiresIn: "1h" });
            return res.send({
                token: token
            });
        })
        .catch(err => {
            console.log(err);
            return res.send({message: 'Error with Authentication'});
        });
});




module.exports = app;


