const express = require("express");
const authJwt = require("../middlewares/authJwt");
const messages = require("../controllers/messages.controller")
module.exports = (app) => {
    const router_message = express.Router();

    router_message.route("/add")
        .post(messages.addMessage)

    router_message.route("/get")
        .post(messages.getMessages)

        app.use("/api/message", router_message); 
};