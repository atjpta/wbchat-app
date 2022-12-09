const express = require("express");
const users = require("../controllers/users.controller");
const authJwt = require("../middlewares/authJwt");

module.exports = (app) => {
    const router_user = express.Router();

    router_user.route("/")
        .get(users.getAllUsers)
        // .delete([authJwt.verifyToken, authJwt.isModerator], users.deleteAll)
        .delete(users.deleteAll)


    router_user.route("/:id")
        .get(users.findOne)
        .put(users.update)
        // .delete([authJwt.verifyToken, authJwt.isModerator], users.delete)
        .delete(users.delete)

    router_user.route("/test/all")
        .get(users.allAccess); 
    router_user.route("/test/user")
        .get([authJwt.verifyToken], users.userBoard);     
    router_user.route("/test/mod")
        .get([authJwt.verifyToken, authJwt.isModerator],users.moderatorBoard); 
    router_user.route("/test/admin")
        .get([authJwt.verifyToken, authJwt.isAdmin], users.adminBoard); 

    app.use("/api/users", router_user); 
};