import { countryStateRepository } from "@/repositories/countryStateRepository";

export const getStatesByCountry = async (countryId: string) => {
  return await countryStateRepository.findByCountryId(countryId);
};
