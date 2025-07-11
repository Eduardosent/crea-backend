import { Context } from "hono";
import * as authService from "../services/authService";
import { generateToken } from "@/lib/jwt";
import { authRepository } from "@/repositories/authRepository";
import { sendVerificationEmail } from "@/lib/email";

export const handleSignup = async (c: Context) => {
  const { email, password } = await c.req.json();
  try {
    await authService.signup(email, password);
    return c.json({ message: "Usuario registrado" });
  } catch (e: any) {
    return c.json({ error: e.message }, 400);
  }
};

export const handleLogin = async (c: Context) => {
  const { email, password } = await c.req.json();
  try {
    const token = await authService.login(email, password);
    return c.json({ token });
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

export const handleTestEmail = async (c: Context) => {
  const email = c.req.query("email");
  if (!email) return c.json({ error: "Falta el parámetro email" }, 400);

  try {
    const token = await generateToken({ email });
    await sendVerificationEmail(email, token);
    return c.json({ message: `Correo de prueba enviado a ${email}` });
  } catch (e: any) {
    return c.json({ error: e.message }, 500);
  }
};
