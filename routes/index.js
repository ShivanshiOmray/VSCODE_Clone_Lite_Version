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

router.get("/file/delete/:filename", function (req, res) {
  fs.unlink(`./files/${req.params.filename}`, function () {
    res.redirect("/");
  });
});

router.get("/folder/delete/:filename", function (req, res) {
  fs.rmdir(`./files/${req.params.filename}`, function () {
    res.redirect("/");
  });
});

router.post("/change/:oldname", function (req, res) {
  fs.rename(
    `./files/${req.params.oldname}`,
    `./files/${req.body.filename}`,
    function (err) {
      res.redirect("/");
    }
  );
});

router.get("/file/:filename", function (req, res, next) {
  fs.readdir("./files", { withFileTypes: true }, function (err, files) {
    fs.readFile(
      `./files/${req.params.filename}`,
      "utf-8",
      function (err, data) {
        res.render("fileshow", { files, filename: req.params.filename, data });
      }
    );
  });
});

module.exports = router;
