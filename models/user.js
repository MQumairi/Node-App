mongoose = require('mongoose');
passportLocalMongoose = require('passport-local-mongoose');

//Create Schema
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

userSchema.plugin(passportLocalMongoose);

//Create model
var User = mongoose.model('User', userSchema);

module.exports = User;