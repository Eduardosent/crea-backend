import { z } from "zod";

export const createUserAccountSchema = z.object({
  fk_user_id: z.uuid(),
  name: z.string().min(3),
  fk_user_type_id: z.uuid(),
  fk_country_id: z.uuid(),
  fk_country_state_id: z.uuid(),
  fk_language_id: z.uuid(),
  birth_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Debe tener formato YYYY-MM-DD"),
  bio: z.string().max(500).optional(),
});
