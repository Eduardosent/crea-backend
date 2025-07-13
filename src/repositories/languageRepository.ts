import { db } from "../config/db";
import { ALL_LANGUAGES } from "@/queries/languages";

export class LanguageRepository {
  async findAll() {
    const result = await db.query(ALL_LANGUAGES);
    return result.rows;
  }
}

export const languageRepository = new LanguageRepository();
