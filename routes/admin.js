const path = require("path");

const express = require("express");

const fs = require("fs");

const rootDir = require("./root-path");

const router = express.Router();

//get version
router.get("/country", (req, res, next) => {
  console.log("Get Country");
  res.sendFile(path.join(rootDir, "views", "country.html"));
});

//post version
router.post("/country", (req, res, next) => {
  console.log( req.body);
  const msg = JSON.parse(JSON.stringify(req.body));
  const txtMsg = "Show Country : "+msg["title"]+"\n";
// console.log(txtMsg);

  fs.appendFile(
    path.join(rootDir,"data","log"),
    txtMsg,
    (err) => {
      if (err) throw err;
      console.log("Finished");
    }
  );
  
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
