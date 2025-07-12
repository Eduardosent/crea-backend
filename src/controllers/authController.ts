import { Context } from "hono";
import * as authService from "../services/authService";
import { authRepository } from "@/repositories/authRepository";

export const handleSignup = async (c: Context) => {
  const { email, password } = c.get("validatedData");
  try {
    await authService.signup(email, password);
    return c.json({ message: "Usuario registrado" });
  } catch (e: any) {
    return c.json({ error: e.message }, 400);
  }
};

export const handleLogin = async (c: Context) => {
  const { email, password } = c.get("validatedData");
  try {
    const token = await authService.login(email, password);
    return c.json(token);
  } catch (e: any) {
    return c.json({ error: e.message }, 401);
  }
};

export const handleVerifyEmail = async (c: Context) => {
  const token = c.req.query("token");
  if (!token) return c.json({ error: "Falta el token" }, 400);

  const user = await authRepository.findUserByVerificationToken(token);
  if (!user) return c.json({ error: "Token inválido" }, 400);
  if (user.verified) return c.json({ message: "Ya estaba verificado" });

  await authRepository.markUserAsVerified(user.id);

  return c.json({ message: "Correo verificado correctamente" });
};

export const handleRefreshToken = async (c: Context) => {
  const { refreshToken } = await c.req.json();
  if (!refreshToken) return c.json({ error: "Falta refresh token" }, 400);

  try {
    const tokens = await authService.refreshTokens(refreshToken);
    return c.json(tokens);
  } catch (e: any) {
    return c.json({ error: e.message }, 401);
  }
};
