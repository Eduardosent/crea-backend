import { db } from "@/config/db";
import { STATES_BY_COUNTRY_ID } from "@/queries/countryStates";

export class CountryStateRepository {
  async findByCountryId(countryId: string) {
    const result = await db.query(STATES_BY_COUNTRY_ID, [countryId]);
    return result.rows;
  }
}

export const countryStateRepository = new CountryStateRepository();
