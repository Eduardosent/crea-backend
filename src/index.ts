import { Hono } from "hono";
import * as dotenv from "dotenv";
import {
  authRoutes,
  countriesRoutes,
  countryStatesRoutes,
  languagesRoutes,
  userAccountsRoutes,
} from "@/routes";

dotenv.config();

const app = new Hono();

app.route("/auth", authRoutes);
app.route("/countries", countriesRoutes);
app.route("/country-states", countryStatesRoutes);
app.route("/languages", languagesRoutes);
app.route("/user-accounts", userAccountsRoutes);

app.get("/", (c) => c.text("API funcionando"));

const port = Number(process.env.PORT) || 4000;

Bun.serve({
  fetch: app.fetch,
  port,
});

console.log(`Servidor escuchando en http://localhost:${port}`);
