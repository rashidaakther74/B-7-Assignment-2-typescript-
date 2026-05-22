import type { Request, Response } from "express";
import { authService } from "./auth.service";

const signup = async (req: Request, res: Response) => {
  const user = await authService.signupUser(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: user.rows[0],
  });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await authService.loginUser(email, password);

  res.json({
    success: true,
    message: "Login successful",
    data: result,
  });
};

export const authController = {
  signup,
  login,
};