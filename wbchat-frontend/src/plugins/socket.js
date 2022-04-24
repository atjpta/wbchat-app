import socketio from "socket.io-client";

const URL = "http://localhost:8088"
const socket = socketio(URL, {autoConnect: false} );

export default socket;