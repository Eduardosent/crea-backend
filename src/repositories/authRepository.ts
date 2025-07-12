import { db } from "../config/db";
import {
  FIND_USER_BY_EMAIL,
  CREATE_USER,
  FIND_USER_BY_VERIFICATION_TOKEN,
  MARK_USER_AS_VERIFIED,
  FIND_USER_BY_ID,
} from "@/queries/users";

export class AuthRepository {
  async findUserById(userId: string) {
    const result = await db.query(FIND_USER_BY_ID, [userId]);
    return result.rows[0];
  }

  /**
   * Busca un usuario por su dirección de correo electrónico.
   * @param email La dirección de correo electrónico del usuario.
   * @returns El objeto de usuario si se encuentra, de lo contrario, undefined.
   */
  async findUserByEmail(email: string) {
    const result = await db.query(FIND_USER_BY_EMAIL, [email]);
    return result.rows[0];
  }

  /**
   * Crea un nuevo usuario en la base de datos.
   * @param email La dirección de correo electrónico del nuevo usuario.
   * @param hash El hash de la contraseña del usuario.
   * @param token El token de verificación para el usuario.
   */
  async createUser(email: string, hash: string, token: string) {
    await db.query(CREATE_USER, [email, hash, token]);
  }

  /**
   * Busca un usuario por su token de verificación.
   * @param token El token de verificación.
   * @returns El objeto de usuario si se encuentra, de lo contrario, undefined.
   */
  async findUserByVerificationToken(token: string) {
    const result = await db.query(FIND_USER_BY_VERIFICATION_TOKEN, [token]);
    return result.rows[0];
  }

  /**
   * Marca a un usuario como verificado y elimina su token de verificación.
   * @param userId El ID del usuario a verificar.
   */
  async markUserAsVerified(userId: number) {
    await db.query(MARK_USER_AS_VERIFIED, [userId]);
  }
}

export const authRepository = new AuthRepository();
