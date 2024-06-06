import User from "../models/userModel.js";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import generateJwtAndSetCookie from "../utils/generateJwt.js";

export const userSignup = async (req: Request, res: Response) => {
  try {
    const { name, username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      res.status(409).json({ message: "user already exist" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name: name,
        username: username,
        password: hashedPassword,
      });
      await newUser.save();
      generateJwtAndSetCookie(newUser._id, res);
      res.status(201).json({ message: "User signed up successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Signup failed" });
  }
};

export const userSignin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    res.status(401).json({ message: "user not found" });
  } else {
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (passwordMatched) {
      generateJwtAndSetCookie(user._id, res);
      res
        .status(200)
        .json({ message: "Logged in Sucessfully", username: user.username });
    } else {
      res.status(401).json({ message: "Wrong Credential" });
    }
  }
};
