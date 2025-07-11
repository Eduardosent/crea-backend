import { Hono } from "hono";
import { handleGetAllCountries } from "@/controllers/countryController";

const countries = new Hono();

countries.get("/", handleGetAllCountries);

export default countries;
