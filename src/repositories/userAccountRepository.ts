import { PatchUserAccount } from "@/types";
import { db } from "../config/db";
import {
    ACCOUNT_BY_ID,
  ACCOUNT_BY_USER_ID,
  buildUpdateUserAccountQuery,
  CREATE_USER_ACCOUNT,
} from "@/queries/userAccounts";

/**
 * Repositorio para operaciones relacionadas con user_accounts.
 */
export class UserAccountRepository {
  /**
   * Busca un user_account por fk_user_id.
   * @param fk_user_id ID del usuario (de la tabla users).
   * @returns El user_account si existe, o undefined.
   */
  async findAccountByUserId(fk_user_id: string) {
    const result = await db.query(
      ACCOUNT_BY_USER_ID,
      [fk_user_id]
    );
    return result.rows[0];
  }

  async findById(userAccountId: string) {
    const result = await db.query(ACCOUNT_BY_ID, [userAccountId]);
    return result.rows[0];
  }

  /**
   * Crea un nuevo perfil de usuario extendido (user_account).
   * @param fk_user_id ID del usuario (de la tabla users).
   * @param name Nombre del usuario.
   * @param fk_user_type_id ID del tipo de usuario.
   * @param fk_country_id ID del país.
   * @param fk_country_state_id ID del estado del país.
   * @param fk_language_id ID del idioma preferido.
   * @param birth_date Fecha de nacimiento (YYYY-MM-DD).
   * @param bio Biografía opcional del usuario.
   * @returns El objeto user_account creado.
   */
  async createUserAccount(
    fk_user_id: string,
    name: string,
    fk_user_type_id: string,
    fk_country_id: string,
    fk_country_state_id: string,
    fk_language_id: string,
    birth_date: string,
    bio?: string
  ) {
    const result = await db.query(CREATE_USER_ACCOUNT, [
      fk_user_id,
      name,
      fk_user_type_id,
      fk_country_id,
      fk_country_state_id,
      fk_language_id,
      birth_date,
      bio ?? null,
    ]);

    return result.rows[0];
  }

  async updateUserAccount(userAccountId: string, updates: PatchUserAccount) {
    const { query, values } = buildUpdateUserAccountQuery(
      userAccountId,
      updates
    );
    const result = await db.query(query, values);
    return result.rows[0];
  }
}

export const userAccountRepository = new UserAccountRepository();
