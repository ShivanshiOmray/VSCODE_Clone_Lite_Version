var express = require("express");
var router = express.Router();
var fs = require("fs");

/* GET home page. */
router.get("/", function (req, res, next) {
  fs.readdir("./files", { withFileTypes: true }, function (err, files) {
    res.render("index", { files });
  });
});

module.exports = router;
