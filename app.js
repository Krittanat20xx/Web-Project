const path = require("path");
const bodyParser = require("body-parser");
// const http = require("http");

const express = require("express");
// const bodyParser = require("body-parser");

const app = express();

const adminRoutes = require("./routes/admin");
const homeRoutes = require("./routes/home");
const covidRoutes = require("./routes/covid");

// app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(covidRoutes);
app.use(homeRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404error.html"));
});
// const sever = http.createServer(app);

app.listen(3000);
