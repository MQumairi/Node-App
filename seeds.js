var mongoose = require("mongoose");
var Campground = require("./models/campground.js");
var Comment = require("./models/comment.js");

var data = [

    {
        name: "Foggy mountain",
        img: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
        description: "Erect a tent on the summit of a huge mountain, surrounded by creepy fog."
    },

    {
        name: "Flaming Forest",
        img: "https://images.unsplash.com/photo-1487750404521-0bc4682c48c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2394&q=80",
        description: "A huge flame with a deadly attack."
    },

    {
        name: "Sunset Beach",
        img: "https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
        description: "Watch the mystical sunset while you're in a cramped tent."
    }

];

function seedDB() {
    //Remove all Campgroudns
    Campground.deleteMany({}, function (err) {
        if (err) {
            console.log("Error: " + err);
        } else {
            console.log("DB emptied from Campgroudns");

            //Add campgrounds
            data.forEach(function (seed) {

                Campground.create(seed, function (err, campground) {
                    if (err) { 
                        console.log(err); 
                    } else { 
                        console.log("Added the campgrounds of name " + campground.name); 
                        //Create a comment and then asscoiate it to the created campgroudn
                        Comment.create(
                            {
                                author: "Homer",
                                text: "This place is great. But would have loved some internet."
                            },
                            function(err, createdComment) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    //Associate comment to campground
                                    campground.comments.push(createdComment);
                                    campground.save();
                                }
                            }
                        );
                    }
                });

            });
        }
    });
}

module.exports = seedDB;

