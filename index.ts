import { listFilesInBucket } from "./src/services/backblazeService";

(async () => {
  const files = await listFilesInBucket(process.env.B2_BUCKET!);
  console.log("Archivos en bucket:", files);
})();
