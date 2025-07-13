import { Hono } from "hono";
import { handleGetAllCountries } from "@/controllers/countryController";
import { authMiddleware } from "@/middlewares/authMiddleware";

export const countriesRoutes = new Hono();

countriesRoutes.use("*", authMiddleware);
countriesRoutes.get("/", handleGetAllCountries);
