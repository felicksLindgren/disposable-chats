import { Server } from "socket.io";
import eiows from "eiows";

const io = new Server(3000, {
    wsEnginge: eiows.Server,
    cors: {
        origin: "http://127.0.0.1:5173"
    }
});

io.on("connection", (socket) => {
    console.log("a user connected");

    socket.emit("hello", "world");

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});