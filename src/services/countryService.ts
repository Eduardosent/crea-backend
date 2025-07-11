import { countryRepository } from "@/repositories/countryRepository";

export const getAllCountries = async () => {
  const countries = await countryRepository.findAll();
  return countries;
};
