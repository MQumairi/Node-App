//====================
//CAMPGROUND ROUTES
//====================

//INDEX
app.get("/campgrounds", function (req, res) {
    console.log(req.user);
    Campground.find({}, function (err, campgrounds) {
      if (err) {
        console.log("something went wrong:");
        console.log(err);
      }
      else {
        res.render("campgrounds/index", { campgrounds: campgrounds });
      }
    });
  });
  
  //NEW
  app.get("/campgrounds/new", function (req, res) {
    res.render("campgrounds/new");
  });
  
  //CREATE
  app.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var img = req.body.img;
    var description = req.body.description;
  
    Campground.create({
      name: name,
      img: img,
      description: description
    },
      function (err, campground) {
        if (err) {
          console.log("something went wrong:");
          console.log(err);
        }
  
        else {
          console.log("save successful:");
          console.log(campground);
          res.redirect("/campgrounds");
        }
      });
  });
  
  //SHOW
  app.get("/campgrounds/:id", function (req, res) {
    //Find the campground with the provided id, and render the show page of that page.
    // res.send("This will be the show page");
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
      if (err) {
        console.log(err);
      }
      else {
        console.log(foundCampground);
        res.render("campgrounds/show", { campground: foundCampground });
      }
    });
  });
  