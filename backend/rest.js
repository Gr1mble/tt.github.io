const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const UserModel = require('./user-model');
const PostEntryModel = require("./notes-model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

const url = "mongodb+srv://GrimbleTT:K1rkw00d!5409@nchq.bi3fqgw.mongodb.net/userdb?retryWrites=true&w=majority";

app.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:4200', 'http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    return next();
})


// App Uses / Sets

app.use(bodyParser.urlencoded({ extended: true }));
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

app.get('/racenotes', function (req, res) {
    res.send('GET Request to Racenotes');
});


// End of Routes


// POST Requests


app.post('/signup', (req, res) => {

    mongoose.connect(url)
        .then(() => {
            console.log('Connected to MongoDB');

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
                                mongoose.connection.close();
                                console.log('Connection to MongoDB Closed');
                                return res.send({ message: 'User Created!' })
                            })
                            .catch(err => {
                                console.log(err + " Failed to Create User!");
                            })
                    })
            } catch (error) {
                console.log(error + "Failed to Create User!");
            }

        })
        .catch(() => {
            console.log('Failed to connect to MongoDB');
        });
});


app.post('/signin', (req, res) => {

    mongoose.connect(url)
        .then(() => {
            console.log('Connected to MongoDB');


            let userFound;

            UserModel.findOne({ username: req.body.username })
                .then(user => {
                    if (!user) {
                        return res.send({ message: 'User Not Found!' });
                    };

                    userFound = user;

                    return bcrypt.compare(req.body.password, user.password);
                })
                .then(result => {
                    if (!result) {
                        return res.send({ message: 'Password is Incorrect!' });
                    };

                    const token = jwt.sign({ username: userFound.username, userId: userFound._id }, "secret_string", { expiresIn: "1h" });
                    mongoose.connection.close();
                    console.log('Connection to MongoDB Closed');
                    return res.send({
                        token: token,
                        expiresIn: 3600
                    });
                })
                .catch(err => {
                    console.log(err);
                    return res.send({ message: 'Error with Authentication' });
                });

        })
        .catch(() => {
            console.log('Failed to connect to MongoDB');
        });

});

app.delete('/remove-entry/:id', (req, res) => {

    mongoose.connect(url)
        .then(() => {
            console.log('Connected to MongoDB');

            PostEntryModel.deleteOne({ _id: req.params.id })
                .then(() => {
                    return res.send({ message: 'Post Deleted' });
                })

        })
        .catch(() => {
            console.log('Failed to connect to MongoDB');
        });
});

app.put('/update-entry/:id', (req, res) => {

    mongoose.connect(url)
        .then(() => {
            console.log('Connected to MongoDB');

            const updatedEntry = new PostEntryModel({ _id: req.body.id, year: req.body.year, entry: req.body.entry })
            PostEntryModel.updateOne({ _id: req.body.id }, updatedEntry)
                .then(() => {
                    return res.send({ message: 'Update Complete' });
                })
        })
        .catch(() => {
            console.log('Failed to connect to MongoDB');
        });
});

app.post('/add-entry', (req, res, next) => {

    mongoose.connect(url)
        .then(() => {
            console.log('Connected to MongoDB');

            const postEntry = new PostEntryModel({ year: req.body.year, entry: req.body.entry });
            postEntry.save()
                .then(result => {
                    console.log(result + " Post Created!");
                    mongoose.connection.close();
                    console.log('Connection to MongoDB Closed');
                    return res.send({ message: 'Post Created!' })
                })

        })
        .catch(() => {
            console.log('Failed to connect to MongoDB');
        });
});

app.get('/post-entries', (req, res, next) => {

    mongoose.connect(url)
        .then(() => {
            console.log('Connected to MongoDB');

            PostEntryModel.find()
                .then((data) => {
                    res.json({ 'PostEntries': data });
                })
                .catch(() => {
                    console.log('Error fetching entries')
                })
        })
        .catch(() => {
            console.log('Failed to connect to MongoDB');
        });
});


module.exports = app;


