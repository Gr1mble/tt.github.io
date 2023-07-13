const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phonenumber: {type: String, required: true},
    games: {type: String, required: false, defaultValue: false},
    emailCheck: {type: String, required: false, defaultValue: false},
    sms: {type: String, required: false, defaultValue: false},

});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("UserModel", userSchema);