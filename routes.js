const fs = require("fs");

const routesHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My First WebApp</title></head>");
    res.write(
      '<body><form action ="/message" method="POST"><input type="text" name="message" /><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const bodyMsg = [];
    req.on("data", (chunk) => {
      bodyMsg.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(bodyMsg).toString();
      const msg = parsedBody.split("=")[1];
      //   fs.writeFileSync("dummy-db.txt", msg);
      fs.writeFile("public-title.txt", msg, (err) => {
        req.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First WebApp</title></head>");
  res.write("<body><h1>Hello moto</h1></body>");
  res.write("</html>");
  res.end();
};

//module.exports = routesHandler;
// module.exports = {
//     handler : routesHandler,
//     logMsg:"Bla bla bla",
// }

// module.exports.handler = routesHandler
// module.exports.logMsg = "LogMsg"

exports.handler = routesHandler;
exports.logMsg = "log something";
