import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const secret = process.env.JWT_SECRET;
  const token = req.cookies.jwt;
  if (!token) {
    res.status(401).json({ message: "unauthorized: token not provided" });
  }
  try {
    const decoded = jwt.verify(token, secret as Secret);
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: invalid token" });
  }
};

export default verifyToken;
