import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes.js";
import connection from "./db/connection.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const port = process.env.PORT;

app.use("/auth", authRouter);

app.listen(port, () => {
  console.log("app listening on port " + port);
  connection();
});
