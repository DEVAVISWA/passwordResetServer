const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./Controller/users");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Password Reset</h1>");
});
app.use('/users', userRouter)

module.exports = app;
