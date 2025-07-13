export type PatchUserAccount = Partial<{
  name: string;
  fk_language_id: string;
  profile_picture_url: string | null;
  bio: string | null;
}>;
