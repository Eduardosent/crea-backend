import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import s3 from "../config/s3";

export const listFilesInBucket = async (bucketName: string) => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      MaxKeys: 10,
    });

    const response = await s3.send(command);

    if (response.Contents && response.Contents.length > 0) {
      return response.Contents.map((obj) => obj.Key);
    } else {
      return [];
    }
  } catch (error) {
    throw new Error("Error listando archivos: " + error);
  }
};
