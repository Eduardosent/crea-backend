import { Context } from "hono";
import * as countryService from "../services/countryService";

export const handleGetAllCountries = async (c: Context) => {
  try {
    const countries = await countryService.getAllCountries();
    return c.json(countries);
  } catch (e: any) {
    return c.json({ error: e.message || "Error al obtener países" }, 500);
  }
};
