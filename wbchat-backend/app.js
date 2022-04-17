const express = require("express");
const cors = require("cors");
const setup_Room_Routes = require("./app/routes/room_chat.routes");
const setup_User_Routes = require("./app/routes/users.routes");
const setup_Auth_Routes = require("./app/routes/auth.routes")


const { BadRequestError, errorHandler } = require("./app/errors");



const app = express();

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

module.exports = app;