import { Hono } from "hono";
import {
  handleSignup,
  handleLogin,
  handleTestEmail,
  handleVerifyEmail,
} from "@/controllers/authController";

const auth = new Hono();

auth.post("/signup", handleSignup);
auth.post("/login", handleLogin);
auth.get("/test-email", handleTestEmail);
auth.get("/verify-email", handleVerifyEmail);

export default auth;
