const http = require("http");
const sever = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Server</title></head>");
    res.write("<body><h1>HELLO</h1><br/><h2>Welcome to my club</h2></body>");
    res.write(
      '<body><form action ="/Creatbook" method="POST"><input type="text" name="Creatbook" /><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/book") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Server</title></head>");
    res.write(
      "<body><ul><li>Peter Pan</li><li>The Old Man and the Sea </li><li>sherlock holmes </li></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/Creatbook" && method === "POST") {
    const bodyMsg = [];
    req.on("data", (chunk) => {  
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(bodyMsg).toString();
      const msg = parsedBody.split("=")[1];
      console.log(msg);
      return res.end();
    });
  }
});
sever.listen(5939);
