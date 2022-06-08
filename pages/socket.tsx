import { useEffect } from "react";
import io from "socket.io-client";

export default () => {
  useEffect(() => {
    fetch("/api/socket").finally(() => {
      const socket = io();

      socket.on("connect", () => {
        console.log("connect");
        socket.emit("join", { roomId: "test", user: "Yahel" });
        console.log(socket);
      });

      socket.on("user join", (data) => {
        console.log(data);
      });

      socket.on("a user connected", (data) => {
        console.log("a user connected", data);
      });

      socket.on("disconnect", () => {
        console.log("disconnect");
      });
    });
  }, []);

  return <h1>Socket.io</h1>;
};
