const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.user = require("./user.models");
db.role = require("./role.models");
db.message = require("./message.models")

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;