const path = require("path");

// const fs = require("fs");

const express = require("express");

const rootDir = require("./root-path");

//const { throws } = require("assert");

const router = express.Router();

//get version
router.get("/country", (req, res, next) => {
  console.log("Country Page");
  res.sendFile(path.join(rootDir, "views", "country.html"));
});

//post version
router.post("/country", (req, res, next) => {
  console.log(req.body);
  const msg = JSON.parse(JSON.stringify(req.body));
  const txtMsg = msg["title"];
  console.log(txtMsg);
});


// router.post("/covid", (req, res, next) => {
//     console.log(typeof req.body);
//     const msg = JSON.parse(JSON.stringify(req.body));
//     const txtMsg = "\nTitle : "+msg["title"];

//     fs.appendFile(
//       path.join(rootDir,"data","text.txt"),
//       txtMsg,
//       (err) => {
//         if (err) throw err;
//         console.log("Finished");
//       }
//     );
  
//     res.redirect("/");
//   });
module.exports = router;
