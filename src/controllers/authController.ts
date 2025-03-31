import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/env";

// Define the function return type as Promise<void>
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

 
    if (email !== "admin@example.com" || password !== "password123") {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Generate JWT token
    const token = jwt.sign({ id: "123", role: "admin" }, config.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
