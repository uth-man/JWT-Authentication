require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json());

//============= Basic Route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to JWT Tutorial",
  });
});
// ============= Login Route ==========
app.post("/login", (req, res) => {
  const user = {
    id: 01,
    username: "Usman",
    email: "usman@gmail.com",
  };
  jwt.sign({ user: user }, process.env.TOKEN_SECRET, (err, token) => {
    if (err) {
      res.status(401).json({
        message: "Problem found in jwt.sign() ",
      });
    } else {
      res.status(200).json({
        Response: token,
      });
    }
  });
});
// ================= POST Route
app.post("/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.TOKEN_SECRET, (err, tokenData) => {
    if (err) {
      res.status(401).json({
        Error: "Trouble at jwt.verify()",
      });
    } else {
      res.status(200).json({
        Success: tokenData,
      });
    }
  });
});

function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  //const decode = jwt.verify(token, "shhhhh");
  req.token = token;
  next();
}

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
