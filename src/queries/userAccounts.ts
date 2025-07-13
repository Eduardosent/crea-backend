import { PatchUserAccount } from "@/types";

export const ACCOUNT_BY_USER_ID = `
  SELECT *
  FROM user_accounts
  WHERE fk_user_id = $1
`;

export const ACCOUNT_BY_ID = `
  SELECT *
  FROM user_accounts
  WHERE id = $1
`;

export const CREATE_USER_ACCOUNT = `
  INSERT INTO user_accounts (
    fk_user_id,
    name,
    fk_user_type_id,
    fk_country_id,
    fk_country_state_id,
    fk_language_id,
    birth_date,
    bio
  ) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8
  )
  RETURNING *;
`;

export function buildUpdateUserAccountQuery(
  userAccountId: string,
  updates: PatchUserAccount
) {
  const keys = Object.keys(updates);
  if (keys.length === 0) throw new Error("No fields to update");

  const setClause = keys
    .map((field, idx) => `${field} = $${idx + 1}`)
    .join(", ");

  const query = `
    UPDATE user_accounts
    SET ${setClause}, updated_at = CURRENT_TIMESTAMP
    WHERE id = $${keys.length + 1}
    RETURNING *;
  `;

  const values = keys.map((key) => updates[key as keyof PatchUserAccount]);
  values.push(userAccountId);

  return { query, values };
}
