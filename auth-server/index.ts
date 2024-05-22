import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes.js";
import connection from "./db/connection.js";
import cors from "cors";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
const port = process.env.PORT;

app.use("/auth", authRouter);

app.listen(port, () => {
  console.log("app listening on port " + port);
  connection();
});
