const express = require("express");
const cors = require("cors");
const setup_Room_Routes = require("./app/routes/room_chat.routes");
const setup_User_Routes = require("./app/routes/users.routes");
const setup_Auth_Routes = require("./app/routes/auth.routes")
const http = require('http');
const { Server } = require("socket.io");


const { BadRequestError, errorHandler } = require("./app/errors");


const crypto = require("crypto");
const randomId = () => crypto.randomBytes(8).toString("hex");

const { InMemorySessionStore } = require("./sessionStore");
const sessionStore = new InMemorySessionStore();

const { InMemoryMessageStore } = require("./messageStore");
const messageStore = new InMemoryMessageStore();

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
setup_Room_Routes(app);
setup_Auth_Routes(app);

// kiểm tra người dùng và cho phép kết nối
io.use((socket, next) => {
  const sessionID = socket.handshake.auth.sessionID;
  if (sessionID) {
    const session = sessionStore.findSession(sessionID);
    if (session) {
      socket.sessionID = sessionID;
      socket.userID = session.userID;
      socket.user = session.user;
      return next();
    }
  }


  const user = socket.handshake.auth.user;
  if (!user) {
    return next(new Error("không có quyền truy cập"));
  }

  socket.sessionID = randomId();
  socket.userID = randomId();
  socket.user = user;
  next();
});

io.on("connection", (socket) => {
  console.log("kết nối socket thành công", socket.sessionID, socket.userID);


  // lưu sessionID vào localStore
  sessionStore.saveSession(socket.sessionID, {
    userID: socket.userID,
    user: socket.user,
    connected: true,
  });

   // emit session details
   socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
  });

  // join the "userID" room
  socket.join(socket.userID);

  // gửi ds tất cả người dùng cho các máy khác biết
  const users = [];

  // lấy tin nhắn dc lưu trong store ra
  const messagesPerUser = new Map();
  messageStore.findMessagesForUser(socket.userID).forEach((message) => {
    const { from, to } = message;
    const otherUser = socket.userID === from ? to : from;
    console.log(otherUser);
    if (messagesPerUser.has(otherUser)) {
      messagesPerUser.get(otherUser).push(message);
    } else {
      messagesPerUser.set(otherUser, [message]);
    }
  });

  sessionStore.findAllSessions().forEach((session) => {
    users.push({
      userID: session.userID,
      user: session.user,
      connected: session.connected,
      messages: messagesPerUser.get(session.userID) || [],
    });
  });
  socket.emit("GetAllUser", users);


  // kiểm tra khi có người mới kết nối vào
  socket.broadcast.emit("user connected", {
    userID: socket.userID,
    user: socket.user,
    connected: true,
    messages: [],
  });

  // gửi tin nhắn riêng
  // forward the private message to the right recipient (and to other tabs of the sender)
  socket.on("private message", ({ content, to }) => {
    const message = {
      content,
      from: socket.userID,
      to,
    };
    socket.to(to).to(socket.userID).emit("private message", message);
    messageStore.saveMessage(message);
  });

  //khi có người ngắt kết nối
  socket.on("disconnect", async () => {
    const matchingSockets = await io.in(socket.userID).allSockets();
    const isDisconnected = matchingSockets.size === 0;
    if (isDisconnected) {
      // notify other users
      socket.broadcast.emit("user disconnected", socket.userID);
      // update the connection status of the session
      sessionStore.saveSession(socket.sessionID, {
        userID: socket.userID,
        user: socket.user,
        connected: false,
      });
    }
  });

});

app.use((req, res, next) => {
    // Code ở đây sẽ chạy khi không có route được định nghĩa nào
    // khớp với yêu cầu. Gọi next() để chuyển sang middleware xử lý lỗi
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept" );
    next(new BadRequestError(404, "Resource not found"));
});
// define error-handling middleware last, after other app.use() and routes calls
app.use((error, req, res, next) => {
    // Middleware xử lý lỗi tập trung.
    // Trong các đoạn code xử lý ở các route, gọi next(error)
    // sẽ chuyển về middleware xử lý lỗi này
   errorHandler.hanleError(error, res);
});

module.exports = server;