var express = require("express");
var router = express.Router();
var fs = require("fs");

/* GET home page. */
router.get("/", function (req, res, next) {
  fs.readdir("./files", { withFileTypes: true }, function (err, files) {
    res.render("index", { files });
  });
});

router.get("/filecreate", function (req, res, next) {
  fs.writeFile(`./files/${req.query.filename}`, "", function (err) {
    if (err) throw err;
    res.redirect("/");
  });
});

router.get("/foldercreate", function (req, res, next) {
  fs.mkdir(`./files/${req.query.foldername}`, function (err) {
    if (err) throw err;
    res.redirect("/");
  });
});

module.exports = router;
