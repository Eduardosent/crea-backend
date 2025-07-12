export const createUserAccountQuery = `
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
