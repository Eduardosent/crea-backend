import { Hono } from "hono";
import { handleGetAllLanguages } from "@/controllers/languageController";
import { authMiddleware } from "@/middlewares/authMiddleware";

export const languagesRoutes = new Hono();

languagesRoutes.use("*", authMiddleware);
languagesRoutes.get("/", handleGetAllLanguages);
