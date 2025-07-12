import { Hono } from "hono";
import { handleGetStatesByCountry } from "@/controllers/countryStateController";
import { authMiddleware } from "@/middlewares/authMiddleware";

const countryStates = new Hono();

countryStates.use("*", authMiddleware);
countryStates.get("/", handleGetStatesByCountry);

export default countryStates;
