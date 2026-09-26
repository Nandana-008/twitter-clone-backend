import { Request, Response } from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  const { email, username, displayName, password } = req.body;

  const user = await registerUser({
    email,
    username,
    displayName,
    password,
  });

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: user,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await loginUser({
    email,
    password,
  });

  return res.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
  });
};

export const me = async (req: Request, res: Response) => {
  const userId = res.locals.user.id;

  const user = await getCurrentUser(userId);

  return res.status(200).json({
    success: true,
    data: user,
  });
};
