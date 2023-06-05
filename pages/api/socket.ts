import { generateUsername } from "@/lib/utils";
import { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";

export default function handler(
  req: NextApiRequest,
  res: any // NextApiResponse
) {
    const { query } = req;
    const { id } = query;

    if (res.socket.server.io) {
        console.log("socket.io already running, reusing...");
    } else {

        const io = new Server(res.socket.server, {
            addTrailingSlash: false,
            cors: {
                origin: process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000",
            }
        });

        io.use((socket, next) => {
            const username = generateUsername('-');
            console.log("username", username);
            (socket as any).username = username;
            next();
        });

        io.on("connection", (socket) => {
            console.log("socket.io connected!", socket.id);

            socket.emit("username", (socket as any).username);
        });

        io.on("disconnect", (socket) => {
            console.log("socket.io disconnected!", socket.id);
        });

        res.socket.server.io = io;
    }

    res.end();
}
