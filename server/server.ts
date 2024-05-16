import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("yaahh all is working.");
});

app.listen(port, () => {
  console.log("app is listening on port " + port);
});
