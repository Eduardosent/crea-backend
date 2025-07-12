import { Context } from "hono";
import * as countryStateService from "@/services/countryStateService";

export const handleGetStatesByCountry = async (c: Context) => {
  const countryId = c.req.query("countryId");
  if (!countryId) return c.json({ error: "Falta countryId" }, 400);

  try {
    const states = await countryStateService.getStatesByCountry(countryId);
    return c.json(states);
  } catch (e: any) {
    return c.json({ error: e.message }, 500);
  }
};
