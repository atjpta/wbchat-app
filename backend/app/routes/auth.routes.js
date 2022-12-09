const verifySignUp= require("../middlewares/verifySignUp");
const controller = require("../controllers/auth.controller");
const authJwt = require("../middlewares/authJwt");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.CheckUserName,
      verifySignUp.CheckEmail,
    ],
    controller.signup
  );
  app.post("/api/auth/signin", controller.signin);
};