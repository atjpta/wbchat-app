const express = require("express");
const users = require("../controllers/users.controller");
const { authJwt } = require("../middlewares");

module.exports = (app) => {
    const router_user = express.Router();

    router_user.route("/")
        .get(users.findAll_user)
        .post(users.create_user);

    router_user.route("/:id")
        .get(users.findOne_user)
        .put(users.update_user);


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