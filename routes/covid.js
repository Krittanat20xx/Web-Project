const path = require("path");
const express = require("express");

const rootDir = require("./root-path");

const router = express.Router();

router.get("/covid", (req, res, next) => {
  console.log("Hello, welcome to my shop");
  res.sendFile(path.join(rootDir, "views","covid.html"));
});

module.exports = router;
