

// //get version
// router.get("/country", (req, res, next) => {
//     console.log("Get Country");
//     res.sendFile(path.join(rootDir, "views", "country.html"));
//   });
  
//   //post version
//   router.post("/country", (req, res, next) => {
//     console.log( req.body);
//     const msg = JSON.parse(JSON.stringify(req.body));
//     const txtMsg = msg["title"];
//     // console.log(txtMsg);
  
//     fs.appendFile(
//       path.join(rootDir,"data","log"),
//       txtMsg,
//       (err) => {
//         if (err) throw err;
//         console.log("Finished");
//       }
//     );
    
//   });
