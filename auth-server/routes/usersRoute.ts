import express from "express";
import getUsers from "../controllers/userControllers.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/users", verifyToken, getUsers);

export default router;
