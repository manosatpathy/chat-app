import express from "express";
import http from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";

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

io.on("connection", (socket) => {
  console.log("socket connected");
  socket.on("chat msg", (msg) => {
    console.log("message: " + msg);
    socket.broadcast.emit("chat msg", msg);
  });
});

app.get("/", (req, res) => {
  res.send("yaahh all working.");
});

server.listen(port, () => {
  console.log("app is listening on port " + port);
});
