import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRoute.js";
import getUsers from "./routes/usersRoute.js";
import connection from "./db/connection.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      "http://localhost:3003",
    ],
    credentials: true,
  })
);

const port = process.env.PORT;

app.use("/auth", authRouter);
app.use("/", getUsers);

app.listen(port, () => {
  console.log("app listening on port " + port);
  connection();
});
