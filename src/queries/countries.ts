export const ALL_COUNTRIES = `
  SELECT id, name
  FROM countries
  WHERE continent = 'America'
  ORDER BY name ASC
`;
