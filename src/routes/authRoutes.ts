import { Hono } from "hono";
import {
  handleSignup,
  handleLogin,
  handleVerifyEmail,
  handleRefreshToken,
} from "@/controllers/authController";
import { validate } from "@/middlewares";
import { loginSchema, signupSchema } from "@/schemas/authSchema";

export const authRoutes = new Hono();

authRoutes.post("/signup", validate(signupSchema), handleSignup);
authRoutes.post("/login", validate(loginSchema), handleLogin);
authRoutes.get("/verify-email", handleVerifyEmail);
authRoutes.get("/refresh-token", handleRefreshToken);
