import express from "express";
import http from "http";
import dotenv from "dotenv";
import { Server, Socket } from "socket.io";

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    allowedHeaders: ["*"],
    origin: "*",
  },
});

interface UserSocketMap {
  [key: string]: Socket;
}

const userSocketMap: UserSocketMap = {};

io.on("connection", (socket) => {
  console.log("socket connected");
  const user = socket.handshake.query.user;
  if (typeof user === "string") {
    userSocketMap[user] = socket;
  } else {
    console.error("invalid user identifier");
  }
  socket.on("chat msg", (msg) => {
    console.log("message: " + msg.txtMsg);
    console.log("sender: " + msg.sender);
    console.log("receiver: " + msg.receiver);
    const receiverSocket = userSocketMap[msg.receiver];
    if (receiverSocket) {
      receiverSocket.emit("chat msg", msg.txtMsg);
    } else {
      console.error("receiver not found or not connected");
    }
  });
});

app.get("/", (req, res) => {
  res.send("yaahh all working.");
});

server.listen(port, () => {
  console.log("app is listening on port " + port);
});
