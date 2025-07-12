import { Hono } from "hono";
import {
  handleSignup,
  handleLogin,
  handleVerifyEmail,
  handleRefreshToken,
} from "@/controllers/authController";
import { validate } from "@/middlewares";
import { loginSchema, signupSchema } from "@/schemas/authSchema";

const auth = new Hono();

auth.post("/signup", validate(signupSchema), handleSignup);
auth.post("/login", validate(loginSchema), handleLogin);
auth.get("/verify-email", handleVerifyEmail);
auth.get("/refresh-token", handleRefreshToken);

export default auth;
