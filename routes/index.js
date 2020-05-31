var express = require("express");
var passport = require("passport");
var router = express.Router();
var User = require('../models/user.js');

//====================
//AUTHENTIATE ROUTES
//====================

//Landing page
router.get("/", function (req, res) {
  res.render("landing");
});

//Register routes
router.get('/register', function (req, res) {
  res.render('register.ejs');
});

router.post('/register', function (req, res) {
  User.register(new User({ username: req.body.username }), req.body.password, function (err, newUser) {
    if (err) {
      console.log('Error: ' + err);
      res.redirect('/register');
    } else {
      passport.authenticate('local')(req, res, function () {
        res.redirect('/campgrounds');
      });
    }
  });
});

//Login routes
router.get('/login', function (req, res) {
  res.render('login.ejs');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/campgrounds',
  failureRedirect: '/login'
}), function (req, res) {
  console.log('Login attempt made');
});

//Logout route
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

//IsLoggedIn Middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;
