import express from "express";
import { userSignup, userSignin } from "../controllers/authControllers.js";

const router = express.Router();

//signup

router.post("/signup", userSignup);
router.post("/signin", userSignin);

export default router;
