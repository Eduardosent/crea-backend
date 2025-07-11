import { Hono } from "hono";
import authRoutes from "./routes/authRoutes";
import * as dotenv from "dotenv";
import countryRoutes from "./routes/countryRoutes";

dotenv.config();

const app = new Hono();

app.route("/auth", authRoutes);
app.route("/countries", countryRoutes);

app.get("/", (c) => c.text("API funcionando"));

const port = Number(process.env.PORT) || 4000;

Bun.serve({
  fetch: app.fetch,
  port,
});

console.log(`Servidor escuchando en http://localhost:${port}`);
