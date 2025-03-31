import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: { id: string; role: string }; // Extend Request to include user
  }
}
export interface AuthRequest extends Request {
    user?: {
      id: string;
      role: string;
    };
  }