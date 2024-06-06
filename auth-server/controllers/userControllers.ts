import { Request, Response } from "express";
import User from "../models/userModel.js";

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}, { name: 1, username: 1 });
    res.status(201).json({ users: users });
  } catch (error) {
    console.log((error as Error).message);
    res.status(500).json({ message: "Server Error" });
  }
};

export default getUsers;
