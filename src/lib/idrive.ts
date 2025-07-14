import {
  PutObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
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
  // Construir URL pública según configuración de IDrive (si tienes CDN o similar)
  // Por defecto el URL para acceso público puede variar, asegúrate si tienes algo configurado
  // Aquí dejo un ejemplo genérico:
  const publicUrl = `${process.env.B2_ENDPOINT}/crea-files/${key}`;

  //   ${process.env.B2_BUCKET}

  return { uploadUrl, publicUrl };
};

export const deleteObjectFromIDrive = async (key: string) => {
  const command = new DeleteObjectCommand({
    Bucket: process.env.B2_BUCKET!,
    Key: key,
  });

  const result = await s3.send(command);
  console.log(`Eliminado: ${key}`, result);

  try {
    await s3.send(
      new HeadObjectCommand({
        Bucket: process.env.B2_BUCKET!,
        Key: key,
      })
    );
    console.log("El archivo sigue existiendo");
  } catch (e: any) {
    if (e.name === "NotFound" || e.$metadata?.httpStatusCode === 404) {
      console.log("Archivo eliminado correctamente");
    } else {
      console.error("Error verificando la eliminación:", e);
    }
  }
};

export const parseIDriveKeyFromUrl = (url: string): string | null => {
  const bucket = process.env.B2_BUCKET!;
  const endpoint = process.env.B2_ENDPOINT!;
  const baseUrl = `${endpoint}/crea-files/`;

  if (!url.startsWith(baseUrl)) return null;

  return url.slice(baseUrl.length);
};
// https://u0m6.or.idrivee2-78.com/crea-files/profile-pictures/898819bc-22a8-4561-b18d-28e494eed761-1752443842853.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=XIFJYCRVH-28A772B788%2F20250713%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250713T220013Z&X-Amz-Expires=604800&X-Amz-Signature=7e8fe228985ce5534f4b3847793c346afb384d9ace04b32413cb49060f111a90&X-Amz-SignedHeaders=host&versionId=null&x-amz-checksum-mode=ENABLED&x-id=GetObject
