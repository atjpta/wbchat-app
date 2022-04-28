const express = require("express");
const { authJwt } = require("../middlewares");
const messages = require("../controllers/messages.controller")
module.exports = (app) => {
    const router_message = express.Router();

    router_message.route("/:id")
        .post([authJwt.verifyToken], messages.create)
        .get([authJwt.verifyToken], messages.findMessagesForUser)

        app.use("/api/message", router_message); 
};