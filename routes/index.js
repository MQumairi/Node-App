//====================
//AUTHENTIATE ROUTES
//====================

//Landing page
app.get("/", function (req, res) {
  res.render("landing");
});

//Register routes
app.get('/register', function (req, res) {
    res.render('register.ejs');
  });
  
  app.post('/register', function (req, res) {
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
  app.get('/login', function (req, res) {
    res.render('login.ejs');
  });
  
  app.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
  }), function (req, res) {
    console.log('Login attempt made');
  });
  
  //Logout route
  app.get('/logout', function (req, res) {
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
  