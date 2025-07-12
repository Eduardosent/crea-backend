import { authRepository } from "@/repositories/authRepository";
import { hashPassword, verifyPassword } from "../lib/hash";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../lib/jwt";
import { sendVerificationEmail } from "../lib/email";

import { randomUUID } from "crypto";

export const signup = async (email: string, password: string) => {
  const existing = await authRepository.findUserByEmail(email);
  if (existing) throw new Error("Ya existe el usuario");

  const hash = await hashPassword(password);
  const token = randomUUID();

  await authRepository.createUser(email, hash, token);
  await sendVerificationEmail(email, token);
};

export const login = async (email: string, password: string) => {
  const user = await authRepository.findUserByEmail(email);
  if (!user) throw new Error("Usuario no encontrado");

  const valid = await verifyPassword(password, user.password);
  if (!valid) throw new Error("Contraseña incorrecta");

  if (!user.verified) {
    throw new Error("Debes verificar tu correo antes de iniciar sesión");
  }

  const [accessToken, refreshToken] = await Promise.all([
    generateAccessToken({ id: user.id, email: user.email }),
    generateRefreshToken({ id: user.id }),
  ]);

  return { accessToken, refreshToken };
};

export const refreshTokens = async (token: string) => {
  try {
    const payload = (await verifyRefreshToken(token)) as { id?: string };
    if (!payload?.id) throw new Error("Token inválid");
    const user = await authRepository.findUserById(payload.id);
    if (!user) throw new Error("Usuario no encontrado");

    const accessToken = await generateAccessToken({
      id: user.id,
      email: user.email,
    });
    const refreshToken = await generateRefreshToken({ id: user.id });

    return { accessToken, refreshToken };
  } catch {
    throw new Error("Refresh token inválido o expirado");
  }
};
