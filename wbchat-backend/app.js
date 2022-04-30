const express = require("express");
const cors = require("cors");
const setup_User_Routes = require("./app/routes/users.routes");
const setup_Auth_Routes = require("./app/routes/auth.routes")
const setup_Message_Routes = require("./app/routes/messages.routes")

const http = require('http');
const { Server } = require("socket.io");


const { BadRequestError, errorHandler } = require("./app/errors");

const app = express();
const server = http.createServer(app);

const io = new Server(server,{
    cors:{
      origin: "*",
      methods:["GET", "POST"],
    },
  });

app.use(cors());
app.use(express.json());
app.use(
   express.urlencoded({
      extended: false,
   })
);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to wbchat." });

});

setup_User_Routes(app);
setup_Auth_Routes(app);
setup_Message_Routes(app);


global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("userRegister", () => {
    socket.broadcast.emit("refreshListUser");
  })
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
    //lấy tất cả người đang onl ra
    const users = []
    onlineUsers.forEach((value, key) => {
        users.push(key)
    });
    socket.emit("userOnl", users);
  });

  // thông báo mọi người biết có người đang onl
  socket.broadcast.emit("user connected", {
    userID: socket.handshake.auth.user.id,
  });
  //thông báo mọi người khi có người off
  socket.on("disconnect", () => {
    socket.broadcast.emit("user disconnected", {
      userID: socket.handshake.auth.user.id,
    });
    onlineUsers.delete(socket.handshake.auth.user.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});


app.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept" );
    next(new BadRequestError(404, "Resource not found"));
});
app.use((error, req, res, next) => {
   errorHandler.hanleError(error, res);
});

module.exports = server;