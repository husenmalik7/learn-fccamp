var express = require("express");
var app = express();
let bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

let staPath = __dirname + "/public";

app.use("/public", express.static(staPath));

app.use(function middleware(req, res, next) {
  // Do something
  var string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  // Call the next function in line:
  next();
});

app.get("/", function (req, res) {
  // let string = 'Hello Express'
  // res.send(string)
  // console.log(string)

  let path = __dirname + "/views/index.html";
  res.sendfile(path);
  console.log(path);
});

app.get("/json", (req, res) => {
  let MESSAGE_STYLE = process.env.MESSAGE_STYLE;
  let message = "Hello json";

  if (MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }

  res.json({
    message: message,
  });
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    console.log(req.time);
    next();
  },
  (req, res) => {
    res.send({
      time: req.time,
    });
  }
);

app.get("/:word/echo", (req, res) => {
  let word = req.params.word;
  console.log(word);

  res.send({
    echo: word,
  });
});

app.get("/name", (req, res) => {
  let fName = req.query.first;
  let lName = req.query.last;
  console.log(fName);
  console.log(lName);

  res.send({
    name: fName + " " + lName,
  });
});

app.post("/name", (req, res) => {
  let fName = req.body.first;
  let lName = req.body.last;
  console.log(fName);
  console.log(lName);

  res.send({
    name: fName + " " + lName,
  });
});

module.exports = app;
