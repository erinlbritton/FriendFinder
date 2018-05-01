// Dependency of seed data
var friends = require("../data/friends");

// Routing to GET and POST to api/friends
module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    // POST to api/friends when a new survey is completed; response is the "best match"
    app.post("/api/friends", function(req, res) {
        friends.push(req.body);
        var newSurvey = req.body;
        var newScores = newSurvey.scores;
        // Convert scores to integers
        for (var i = 0; i < newScores.length; i++) {
            newScores[i] = parseInt(newScores[i]);
        }
        // console.log(newScores);
        // The goal is to find the minimum difference between the new scores and all existing scores
        // Because the max score = 40, start with 41 so the first check will always result in a lower score
        var minScore = 41; // Max score = 10 * (5 - 1) = 40
        var minName = "";
        var minPhoto = "";
        // Check each existing friend (except for the newest submission)
        for (var i = 0; i < friends.length-1; i++) {

            var thisScore = 0;
            // Sum the difference of each score-pair
            for (var j = 0; j < friends[i].scores.length; j++) {
                var diff = friends[i].scores[j] - newScores[j];
                diff = Math.abs(diff);
                thisScore += diff;
            }
            // If the total score difference is less than the existing minScore, 
            // then this user is the "best match." Looping through all members
            // yields the user with the minimum score differential 
            if (thisScore < minScore) {
                minScore = thisScore;
                minName = friends[i].name;
                minPhoto = friends[i].photo;
            }
        };
        // console.log("Score: " + minScore);
        // console.log("Name: " + minName);
        // console.log("Photo: " + minPhoto);
        // Pass the "best match" as an object for the modal
        var data = {
            name : minName,
            photo : minPhoto
        }
        res.json(data);
    });
};