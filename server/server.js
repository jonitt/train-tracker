//Author: Joni Tuhkanen
//this the main file of serverside
const path = require("path");
const cors = require("cors");
const express = require("express");

const app = express();
app.use(cors());
app.use(function(req, res, next) {
  initiateHeader(res);
  next();
});
app.use(express.static(path.join(__dirname + "/../dist/")));

const port = process.env.PORT || 3000;

function initiateHeader(res) {
  res.set({
    "X-XSS-Protection": "1; mode=block",
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff"
  });
  return res;
}

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "/../dist/index.html"), e => {
    console.log(e);
  });
});

app.listen(port, () => console.log("Listening on port " + port));
