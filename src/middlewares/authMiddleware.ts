import { Context, Next } from "hono";
import { verifyAccessToken } from "@/lib/jwt";

export const authMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader) return c.json({ error: "No autorizado" }, 401);

  const token = authHeader.replace("Bearer ", "");
  try {
    await verifyAccessToken(token);
    await next();
  } catch {
    return c.json({ error: "Token inválido" }, 401);
  }
};
