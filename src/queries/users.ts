export const FIND_USER_BY_EMAIL = `
  SELECT * FROM users WHERE email = $1
`;

export const CREATE_USER = `
  INSERT INTO users (email, password, verification_token)
  VALUES ($1, $2, $3)
`;

export const FIND_USER_BY_VERIFICATION_TOKEN = `
  SELECT * FROM users WHERE verification_token = $1
`;

export const MARK_USER_AS_VERIFIED = `
  UPDATE users SET verified = true, verification_token = NULL WHERE id = $1
`;
