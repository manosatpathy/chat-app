import User from "../models/userModel.js";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export const userSignup = async (req: Request, res: Response) => {
  const { name, username, password } = req.body;

  const user = await User.findOne({ username });
  if (user) {
    res.status(402).json({ message: "user already exist" });
  } else {
    const hashedPassword = bcrypt.hash(password, 10);
    const newUser = new User({
      name: name,
      username: username,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(202).json({ message: "User signed up successfully" });
  }
};
