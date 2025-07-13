import { Hono } from "hono";
import {
  handleCreateUserAccount,
  handleGetPresignedProfilePictureUrl,
  handleUpdateUserAccount,
} from "@/controllers/userAccountController";
import { authMiddleware } from "@/middlewares/authMiddleware";
import { validate } from "@/middlewares";
import { createUserAccountSchema } from "@/schemas/userAccountSchema";

export const userAccountsRoutes = new Hono();

userAccountsRoutes.use("*", authMiddleware);
userAccountsRoutes.post(
  "/",
  validate(createUserAccountSchema),
  handleCreateUserAccount
);
userAccountsRoutes.get(
  "/presigned/profile-picture",
  handleGetPresignedProfilePictureUrl
);
userAccountsRoutes.patch("/:id", handleUpdateUserAccount);
