const ROLES = require("../models/role.models");
const User = require("../models/user.models");

CheckUserName = async (req, res, next) => {
  await User.findOne({ username: req.body.username }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return
    }
    if (user) {
      res.status(400).send({ message: "Username đã được sử dụng!" });
      return
    }
    next();
  })
}

CheckEmail = async (req, res, next) => {
  await User.findOne({ email: req.body.email }).exec((err, email) => {
    if (err) {
      res.status(500).send({ message: err});
      return
    }
    if (email) {
      res.status(400).send({ message: "Email đã được sử dụng!" });
      return
    }
    next();
  })
}

const verifySignUp = {
  CheckUserName,
  CheckEmail,
};
module.exports = verifySignUp;