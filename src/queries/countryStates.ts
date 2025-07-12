export const STATES_BY_COUNTRY_ID = `
  SELECT id, name 
  FROM country_states 
  WHERE fk_country_id = $1 
  ORDER BY name ASC
`;

