import { authRepository } from "@/repositories/authRepository";
import { hashPassword, verifyPassword } from "../lib/hash";
import { generateToken } from "../lib/jwt";
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

  const token = await generateToken({ id: user.id, email: user.email });
  return token;
};
