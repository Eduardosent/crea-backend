import { Hono } from "hono";
import { handleGetStatesByCountry } from "@/controllers/countryStateController";
import { authMiddleware } from "@/middlewares/authMiddleware";

export const countryStatesRoutes = new Hono();

countryStatesRoutes.use("*", authMiddleware);
countryStatesRoutes.get("/", handleGetStatesByCountry);
