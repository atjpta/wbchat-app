const express = require("express");
const rooms = require("../controllers/room_chat.controller");

module.exports = (app) => {
    const router_room = express.Router();

    router_room.route("/")
        .get(rooms.findAll_room)
        .post(rooms.create_room);

    router_room.route("/:id")
        .get(rooms.findOne_room)
        .put(rooms.update_room)
        .delete(rooms.delete_room);

    app.use("/api/rooms", router_room);
};