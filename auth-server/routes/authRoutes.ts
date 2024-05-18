import express from "express";
import { userSignup } from "../controllers/authControllers.js";

const router = express.Router();

//signup

router.post("/signup", userSignup);

export default router;
