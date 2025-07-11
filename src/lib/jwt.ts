import { sign, verify } from "hono/jwt";
const secret = process.env.JWT_SECRET!;

export const generateToken = (payload: any, expiresInSeconds = 3600) => {
  const now = Math.floor(Date.now() / 1000);
  const exp = now + expiresInSeconds;

  return sign({ ...payload, exp }, secret);
};

export const verifyToken = (token: string) => verify(token, secret);
