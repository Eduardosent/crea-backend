import { db } from "../config/db";
import { ALL_COUNTRIES } from "@/queries/countries";

export class CountryRepository {
  async findAll() {
    const result = await db.query(ALL_COUNTRIES);
    return result.rows;
  }
}

export const countryRepository = new CountryRepository();
