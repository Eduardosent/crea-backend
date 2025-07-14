import { Context } from "hono";
import {
  createUserAccount,
  updateUserAccount,
} from "@/services/userAccountService";
import { generatePresignedUploadUrl } from "@/lib/idrive";
import { IMAGE_EXTENSIONS } from "@/constants";

export const handleCreateUserAccount = async (c: Context) => {
  const {
    fk_user_id,
    name,
    fk_user_type_id,
    fk_country_id,
    fk_country_state_id,
    fk_language_id,
    birth_date,
    bio,
  } = c.get("validatedData");

  try {
    const userAccount = await createUserAccount({
      fk_user_id,
      name,
      fk_user_type_id,
      fk_country_id,
      fk_country_state_id,
      fk_language_id,
      birth_date,
      bio,
    });

    return c.json(userAccount, 201);
  } catch (e: any) {
    return c.json({ error: e.message }, 400);
  }
};

export const handleGetPresignedProfilePictureUrl = async (c: Context) => {
  const userId = c.req.query("user_id");
  const extension = c.req.query("extension")?.toLowerCase();

  if (!userId) return c.json({ error: "Falta user_id" }, 400);
  if (!extension) return c.json({ error: "Falta extension" }, 400);

  if (!IMAGE_EXTENSIONS.includes(extension)) {
    return c.json({ error: "Extensión no permitida" }, 400);
  }

  try {
    const result = await generatePresignedUploadUrl(
      "profile-picture",
      userId,
      extension
    );
    return c.json(result);
  } catch (e: any) {
    return c.json({ error: e.message }, 500);
  }
};

export const handleUpdateUserAccount = async (c: Context) => {
  const userAccountId = c.req.param("id");
  const data = await c.req.json();

  try {
    const updated = await updateUserAccount(userAccountId, data);
    return c.json(updated);
  } catch (e: any) {
    return c.json({ error: e.message }, 500);
  }
};
