import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3 from "@/config/s3";

const mimeTypes: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  // Puedes agregar más formatos aquí
};

export const generatePresignedUploadUrl = async (
  fileType: string,
  userId: string,
  extension: string,
  expiresIn = 300
) => {
  const folderMap: Record<string, string> = {
    "profile-picture": "profile-pictures",
    // otros tipos si los tienes
  };

  const folder = folderMap[fileType];
  if (!folder) throw new Error("Tipo de archivo no soportado");

  const ext = extension.toLowerCase();
  const mimeType = mimeTypes[ext];

  if (!mimeType) throw new Error(`Extensión o MIME no soportado: ${ext}`);

  const timestamp = Date.now();
  const key = `${folder}/${userId}-${timestamp}.${ext}`;

  const command = new PutObjectCommand({
    Bucket: process.env.B2_BUCKET!,
    Key: key,
    ContentType: mimeType,
  });

  const uploadUrl = await getSignedUrl(s3, command, { expiresIn });
  const publicUrl = `https://f005.backblazeb2.com/file/${process.env.B2_BUCKET}/${key}`;

  return { uploadUrl, publicUrl };
};

export const deleteObjectFromBackblaze = async (key: string) => {
  const command = new DeleteObjectCommand({
    Bucket: process.env.B2_BUCKET!,
    Key: key,
  });

  const result = await s3.send(command);
  console.log(key, "was deleted");
  if (result.DeleteMarker) {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.B2_BUCKET!,
        Key: key,
        VersionId: result.VersionId, // Usa el VersionId del DeleteMarker
      })
    );
    console.log("Borrado físico forzado para:", key);
  }
};
