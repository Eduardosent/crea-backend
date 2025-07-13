import { eliminarArchivo } from "@/config/b2";
import { deleteObjectFromBackblaze } from "@/lib/backblaze";
import { parseBackblazeKeyFromUrl } from "@/lib/backblazeUtils";
import { userAccountRepository } from "@/repositories/userAccountRepository";
import { PatchUserAccount } from "@/types";

export const createUserAccount = async (data: {
  fk_user_id: string;
  name: string;
  fk_user_type_id: string;
  fk_country_id: string;
  fk_country_state_id: string;
  fk_language_id: string;
  birth_date: string;
  bio?: string;
}) => {
  const existing = await userAccountRepository.findAccountByUserId(
    data.fk_user_id
  );
  if (existing) throw new Error("El usuario ya tiene un perfil creado");

  const userAccount = await userAccountRepository.createUserAccount(
    data.fk_user_id,
    data.name,
    data.fk_user_type_id,
    data.fk_country_id,
    data.fk_country_state_id,
    data.fk_language_id,
    data.birth_date,
    data.bio
  );

  return userAccount;
};

export const updateUserAccount = async (
  userAccountId: string,
  updates: PatchUserAccount
) => {
  // Si no se va a actualizar imagen, solo se hace el patch normal
  if (!updates.profile_picture_url) {
    console.log("patch sin imagen");
    return await userAccountRepository.updateUserAccount(
      userAccountId,
      updates
    );
  }

  // Si trae nueva imagen, buscamos el perfil actual para obtener el URL anterior
  const existingAccount = await userAccountRepository.findById(userAccountId);
  const oldUrl = existingAccount?.profile_picture_url;
  console.log("oldurl", oldUrl);

  // Si había una imagen anterior, la eliminamos del bucket
  if (oldUrl) {
    eliminarArchivo(oldUrl);
    // const oldKey = parseBackblazeKeyFromUrl(oldUrl);
    // console.log("oldKey", oldKey);
    // if (oldKey) await deleteObjectFromBackblaze(oldKey);
  }

  // Actualizar con nueva URL
  return await userAccountRepository.updateUserAccount(userAccountId, updates);
};
