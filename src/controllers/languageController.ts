import { Context } from "hono";
import { getAllLanguages } from "@/services/languageService";

export const handleGetAllLanguages = async (c: Context) => {
  const languages = await getAllLanguages();
  return c.json(languages);
};
