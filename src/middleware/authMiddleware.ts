import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/env";
import { decode } from "punycode";

export const authenticateUser = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Access Denied: No Token Provided!" });
      return; 
    }

    const decoded = jwt.verify(token, config.JWT_SECRET) as { id: string; role: string };
    req.user = decoded;
    console.log(decoded);
    next(); 
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};
