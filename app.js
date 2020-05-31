var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var expressSanitizer = require('express-sanitizer');

//npm install passport passport-local passport-local-mongoose express-session
var passport = require('passport');
var localStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var expressSession = require('express-session');

//Require Models
var User = require('./models/user.js');

//Use authentication pacakges
app.use(expressSession({
  secret: 'I love mac osx',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//Serialize
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());

var mongoDB = 'mongodb://127.0.0.1:27017/campgrounds';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Add this line to not need to have ".ejs" extension written in after each call on render.
app.set("view engine", "ejs");

app.use(express.static("assets"));

//Require seeds file
var seedDB = require("./seeds.js");
seedDB();

//Pass in user to all routes
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

//Require Routes
var campgroundRoutes = require("./routes/campgrounds.js");
var commentsRoutes = require("./routes/comments.js");
var indexRoutes = require("./routes/index.js");

//Use Routes
app.use(campgroundRoutes);
app.use(commentsRoutes);
app.use(indexRoutes);

app.listen(3000, process.env.IP, function () {
  console.log("Server started!");
});