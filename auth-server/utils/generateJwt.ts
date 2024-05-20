import jwt from "jsonwebtoken";
import express from "express";
import { ObjectId } from "mongodb";

const generateJwtAndSetCookie = (userId: ObjectId, res: express.Response) => {
  const secret = process.env.JWT_SECRET as string;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }
  const token = jwt.sign({ userId: userId.toHexString() }, secret, {
    expiresIn: "15d",
  });
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: false,
  });
};

export default generateJwtAndSetCookie;
