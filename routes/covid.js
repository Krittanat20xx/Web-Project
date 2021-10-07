const path = require("path");

const express = require("express");

const fs = require("fs");

const rootDir = require("./root-path");

const router = express.Router();

router.get("/covid", (req, res, next) => {
  console.log("Get Covid-19");
  res.sendFile(path.join(rootDir, "views", "covid.html"));
});

router.post("/covid", (req, res, next) => {
  console.log(typeof req.body);
  const msg = JSON.parse(JSON.stringify(req.body));
  const txtMsg = "Show Covid : "+msg["title"]+"\n";

  fs.appendFile(
    path.join(rootDir,"data","log"),
    txtMsg,
    (err) => {
      if (err) throw err;
      console.log("Finished");
    }
  );

  // res.redirect("/");
});
module.exports = router;
