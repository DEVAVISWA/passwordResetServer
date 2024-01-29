const User = require("../Models/user");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, EMAIL_FROM, EMAIL_FROM_PASSWORD } = require("../Utils/config");
const nodemailer = require("nodemailer");
const forgotPasswordRouter = require("express").Router();

forgotPasswordRouter.post("/", (req, res) => {
  const { Email } = req.body;
  User.findOne({ Email }).then((user) => {
    if (!user) {
      return res.status(401).json({ message: "user doesnt exist" });
    }
    const payload = {
      name: user.Name,
      email: user.Email,
      id: user._id,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_FROM,
        pass: EMAIL_FROM_PASSWORD, 
      },
    });

    var mailOptions = {
      from: EMAIL_FROM,
      to: user.Email,
      subject: "Reset Password Link",
      text: `http://localhost:5173/reset-password/${user._id}/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.send({ Status: "Success" });
      }
    });
  });
});

module.exports = forgotPasswordRouter;
