import type { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";

interface JwtPayload {
  userId: string;
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    throw new ApiError(401, "Unauthorized");
  }

  const token = authHeader.split(" ")[1];

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined");
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

    res.locals.user = {
      id: decoded.userId,
    };

    next();
  } catch {
    throw new ApiError(401, "Invalid or expired token");
  }
};

export const optionalAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next();
  }

  if (!authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Unauthorized");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new ApiError(401, "Unauthorized")
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined");
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

    if (typeof decoded.userId !== "string") {
      throw new ApiError(401, "Unauthorized");
    }

    res.locals.user = {
      id: decoded.userId,
    };

    return next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new ApiError(401, "Token expired");
    } else if (error instanceof JsonWebTokenError) {
      throw new ApiError(401, "Unauthorized");
    }
    throw error;
  }
};
