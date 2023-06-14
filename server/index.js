import { Server } from "socket.io";
import * as eiows from "eiows";
import rug from "random-username-generator";

const io = new Server(3000, {
    wsEnginge: eiows.Server,
    cors: {
        origin: process.env.CLIENT_URL,
    }
});

io.use((socket, next) => {
    rug.setSeperator('_');
    let username = rug.generate();
    username = username.split('_').slice(0, 2).join('_').toLocaleLowerCase();
    socket.username = username;

    next();
});

io.on("connection", async (socket) => {
    const room = socket.handshake.query.code || socket.id;

    console.log(socket.username, "joining room", room);
    socket.join(room);

    // emit all users in the room
    const users = [];

    await io.in(room).fetchSockets().then((sockets) => {
        sockets.forEach((socket) => {
            users.push({
                userID: socket.id,
                username: socket.username
            });
        });
    });

    socket.emit("users", users);

    socket.on("message", (message) => {
        console.log(socket.username, message, room);
        const message_to_emit = {
            userID: socket.id,
            username: socket.username,
            message,
            time: new Date().toLocaleTimeString()
        };

        io.in(room).emit("message", message_to_emit);
    });

    // emit new user
    socket.to(room).emit("user connected", {
        userID: socket.id,
        username: socket.username
    });

    socket.on("disconnect", () => {
        socket.to(room).emit("user disconnected", socket.id);
    });
});