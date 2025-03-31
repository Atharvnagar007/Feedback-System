import { Request, Response, NextFunction } from "express";

// Extend Request type to include user
interface AuthenticatedRequest extends Request {
  user?: { id: string; role: string };
}

export const authorizeRole = (requiredRole: string) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized: No user data found" });
      return; 
    }

    if (req.user.role !== requiredRole) {
      res.status(403).json({ message: "Forbidden: Insufficient permissions" });
      return; 
    }

    next(); 
  };
};
