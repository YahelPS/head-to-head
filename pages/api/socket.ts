import { NextApiRequest } from "next";
import { Server } from "socket.io";
import { NextApiResponseServerIO } from "../../@types/next";

let users: any[] = [];

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function SocketManager(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (!res.socket.server.io) {
    console.log("[Socket] Starting Socket");

    //@ts-ignore
    const io = new Server(res.socket.server);

    io.on("connection", (socket) => {
      socket.on("join server", (username) => {
        const user = {
          username,
          id: socket.id,
        };
        users.push(user);
        io.emit("new user", user);

        socket.on("join room", (room, callback: (users: any[]) => void) => {
          socket.join(room);
          callback(users);
          socket.emit("joined", room);
        });
      });
    });

    res.socket.server.io = io;
  } else {
    console.log("[Socket] Socket already exists");
  }
  res.end();
}
