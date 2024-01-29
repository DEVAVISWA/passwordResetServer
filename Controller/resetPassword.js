const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../Utils/config");
const bcrypt = require("bcrypt");
const User = require("../Models/user");
const mongoose= require('mongoose')

const resetPasswordRouter = require("express").Router();

resetPasswordRouter.post("/", (req, res) => {
  const { Password,id,token } = req.body;
  // console.log(Password,id)
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.json({ Message: "Token Invalid" });
    } else {
      bcrypt
        .hash(Password, 10)
        .then((hash) => {
          User.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, { passwordHash : hash })
            .then((u) => res.send({ Status: "success",u }))
            .catch((err) => res.send({ Status: err }));
        })
        .catch((err) => res.send({ Status: err }));
    }
  });
});

module.exports = resetPasswordRouter;
