//Require mongoose

var mongoose = require("mongoose");
var mongoDB = 'mongodb://127.0.0.1:27017/cat_app';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Create cat schema
var catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  color: String
});

var Cat = mongoose.model("Cat", catSchema);

//Adding a cat to the DB
// var garfield = new Cat({
//   name: "Biggle",
//   age: 11,
//   color: "Orange"
// });
//
// garfield.save(function(err, cat) {
//   if(err) {
//     console.log("something went wrong:");
//     console.log(err);
//   }
//
//   else {
//     console.log("save successful:");
//     console.log(cat);
//   }
// });

Cat.create({
  name: "Biggle",
  age: 20,
  color: "Red"
},
function(err, cat) {
    if(err) {
      console.log("something went wrong:");
      console.log(err);
    }

    else {
      console.log("save successful:");
      console.log(cat);
    }
});

//Calling a cat to the DB
Cat.find({}, function(err, cats) {
  if(err) {
    console.log("something went wrong:");
    console.log(err);
  }

  else {
    console.log("save successful:");
    console.log(cats);
  }
});
