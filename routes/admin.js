const path = require("path");
const fs = require("fs");
const express = require("express");

const rootDir = require("./root-path");

//const { throws } = require("assert");

const router = express.Router();

//get version
router.get("/add-product", (req, res, next) => {
  console.log("add-product page");
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

//post version
router.post("/add-product", (req, res, next) => {
  console.log(typeof req.body);
  const msg = JSON.parse(JSON.stringify(req.body));
  const txtMsg = msg["title"]; //book1

  fs.appendFile(
    path.join(rootDir, "data", "product-title.txt"),
    txtMsg,
    (err) => {
      if (err) throw err;
      console.log("Finished");
    }
  );

  //res.redirect("/");
});

module.exports = router;
