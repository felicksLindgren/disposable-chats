import { Server } from "socket.io";
import eiows from "eiows";
import rug from "random-username-generator";

const io = new Server(3000, {
    wsEnginge: eiows.Server,
    cors: {
        origin: "http://localhost:5173"
    }
});

io.use((socket, next) => {
    rug.setSeperator('_');
    let username = rug.generate();
    username = username.split('_').slice(0, 2).join('_').toLocaleLowerCase();
    socket.username = username

    next();
});

io.on("connection", (socket) => {

    socket.emit("username", socket.username);

    // emit all users
    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
        users.push({
            userID: id,
            username: socket.username
        });
    }
    socket.emit("users", users);

    socket.on("message", (message) => {
        const message_to_emit = {
            userID: socket.id,
            username: socket.username,
            message,
            time: new Date().toLocaleTimeString()
        };

        socket.emit("message", message_to_emit);
        socket.broadcast.emit("message", message_to_emit);
    });

    // emit new user
    socket.broadcast.emit("user connected", {
        userID: socket.id,
        username: socket.username
    });

    socket.on("disconnect", () => {
        socket.broadcast.emit("user disconnected", socket.id);
    });
});