export const parseBackblazeKeyFromUrl = (url: string): string | null => {
  const baseUrl = "https://f005.backblazeb2.com/file/";
  if (!url.startsWith(baseUrl)) return null;

  return url.replace(baseUrl + process.env.B2_BUCKET! + "/", "");
};
