import { languageRepository } from "@/repositories/languageRepository";

export const getAllLanguages = async () => {
  return await languageRepository.findAll();
};
