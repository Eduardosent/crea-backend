import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.B2_KEY_ID!,
    secretAccessKey: process.env.B2_APP_KEY!,
  },
  endpoint: process.env.B2_ENDPOINT!,
  region: "us-east-1",
  forcePathStyle: true,
});

export default s3;
