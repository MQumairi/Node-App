var mongoose = require("mongoose");

//Schema
var campgroundsSchema = new mongoose.Schema({
  name: String,
  img: String,
  description: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
});

//Model
var Campground = mongoose.model("Campground", campgroundsSchema);

//Add a campground
// Campground.create({
//   name: "Eiffel Tower",
//   img: "https://photos.mandarinoriental.com/is/image/MandarinOriental/paris-2017-home?$MO_masthead-property-mobile$",
//   description: "A huge tower in the middle of a city"
// },
// function(err, campground) {
//     if(err) {
//       console.log("something went wrong:");
//       console.log(err);
//     }
//
//     else {
//       console.log("save successful:");
//       console.log(campground);
//     }
// });

module.exports = Campground;