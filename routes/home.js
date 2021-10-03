const path = require("path");

const express = require("express");

const rootDir = require("./root-path");

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("Home Page");
  res.sendFile(path.join(rootDir, "views", "index.html"));
});

module.exports = router;
