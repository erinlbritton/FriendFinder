// Dependency
var path = require("path");

// Routing to send html; home.html is default
module.exports = function(app) {

    app.get("/home", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/html/home.html"));
    });

    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/html/survey.html"));
    });

    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/html/home.html"));
    });
};