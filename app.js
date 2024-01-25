const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./Controller/users");
const loginRouter = require("./Controller/login");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Password Reset</h1>");
});
app.use('/users', userRouter)
app.use('/login', loginRouter)


module.exports = app;
