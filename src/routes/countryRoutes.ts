import { Hono } from "hono";
import { handleGetAllCountries } from "@/controllers/countryController";
import { authMiddleware } from "@/middlewares/authMiddleware";

const countries = new Hono();

countries.use("*", authMiddleware);
countries.get("/", handleGetAllCountries);

export default countries;
