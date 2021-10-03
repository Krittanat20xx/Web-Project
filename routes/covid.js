const path = require("path");

const express = require("express");

const fs = require("fs");

const rootDir = require("./root-path");

const router = express.Router();

router.get("/covid", (req, res, next) => {
  console.log("Covid-19 Page");
  res.sendFile(path.join(rootDir, "views", "covid.html"));
});

router.post("/covid", (req, res, next) => {
  console.log(typeof req.body);
  const msg = JSON.parse(JSON.stringify(req.body));
  const txtMsg = "\nTitle : "+msg["title"];

  fs.appendFile(
    path.join(rootDir,"data","text.txt"),
    txtMsg,
    (err) => {
      if (err) throw err;
      console.log("Finished");
    }
  );

  res.redirect("/");
});
module.exports = router;
