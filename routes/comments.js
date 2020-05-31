//====================
//COMMENT ROUTES
//====================

//NEW
app.get('/campgrounds/:id/comments/new', isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
      if (err) {
        console.log('Error: ' + err);
      } else {
        res.render("comments/new", { campground: campground });
      }
    });
  });
  
  //CREATE
  //Ensure that the form's inputs have names in the format of blog[title], where blog is the name of the object
  app.post('/campgrounds/:id/comments', isLoggedIn, function (req, res) {
  
    //Sanitize the author
    req.body.comment.author = req.sanitize(req.body.comment.author);
    //Santiize the text
    req.body.comment.text = req.sanitize(req.body.comment.text);
  
    Comment.create(req.body.comment, function (err, newComment) {
      if (err) {
        console.log('Error: ' + error);
        res.render('comments/new');
      } else {
        Campground.findById(req.params.id, function (err, foundCampground) {
          if (err) {
            console.log('Error: ' + err);
          } else {
            foundCampground.comments.push(newComment);
            foundCampground.save(function (err, savedCampground) {
              if (err) {
                console.log(err);
              } else {
                console.log(foundCampground);
                res.redirect('/campgrounds/' + savedCampground._id);
              }
            });
          }
        });
      }
    });
  
  
  });