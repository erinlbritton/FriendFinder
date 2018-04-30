
var friends = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {
        friends.push(req.body);
        var newSurvey = req.body;
        var newScores = newSurvey.scores;
        for (var i = 0; i < newScores.length; i++) {
            newScores[i] = parseInt(newScores[i]);
        }
        // console.log(newScores);

        var minScore = 41; // Max score = 10 * (5 - 1) = 40
        var minName = "";
        var minPhoto = "";
        
        for (var i = 0; i < friends.length-1; i++) {

            var thisScore = 0;

            for (var j = 0; j < friends[i].scores.length; j++) {
                var diff = friends[i].scores[j] - newScores[j];
                diff = Math.abs(diff);
                thisScore += diff;
            }

            if (thisScore < minScore) {
                minScore = thisScore;
                minName = friends[i].name;
                minPhoto = friends[i].photo;
            }
        };
        // console.log("Score: " + minScore);
        // console.log("Name: " + minName);
        // console.log("Photo: " + minPhoto);
        var data = {
            name : minName,
            photo : minPhoto
        }
        res.json(data);
    });
};