import { z, ZodType } from "zod";
import type { Context, Next } from "hono";

export const validate = <T>(schema: ZodType<T>) => {
  return async (c: Context, next: Next) => {
    const data = await c.req.json();
    const result = schema.safeParse(data);
    if (!result.success) {
      return c.json(
        {
          error: "Validation failed",
          details: result.error.issues.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
        400
      );
    }
    c.set("validatedData", result.data as T);
    await next();
  };
};
