const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/user.models");
const Role = require("../models/role.models");

verifyToken = (req, res, next) => {
  let token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send({ message: "chưa có token!" });
  }
  jwt.verify(token, config.jwt.secret, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ message: "không có quyền truy cập!" });
    }

    req.userId = decoded.id;
    console.log(req.userId);

    next();
  });
};

isAdmin = async (req, res, next) => {
  await User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Role.find({ _id: { $in: user.roles }},(err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin" || roles[i].name === "moderator") {
            next();
            return;
          }
        }
        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};
isModerator = async (req, res, next) => {
  await User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Role.find({_id: { $in: user.roles }},
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }
        res.status(403).send({ message: "Require Moderator Role!" });
        return;
      }
    );
  });
};
const authJwt = {
  verifyToken,
  isAdmin,
  isModerator
};
module.exports = authJwt;