const path = require("path");
const express = require("express");

const rootDir = require("./root-path");

const router = express.Router();

router.get("/country", (req, res, next) => {
  console.log("Hello, welcome to my country");
  res.sendFile(path.join(rootDir,"views", "country.html"));
});

module.exports = router;
