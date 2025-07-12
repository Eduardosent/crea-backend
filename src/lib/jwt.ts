import { sign, verify } from "hono/jwt";

const accessSecret = process.env.JWT_ACCESS_SECRET!;
const refreshSecret = process.env.JWT_REFRESH_SECRET!;
const accessExp = Number(process.env.ACCESS_TOKEN_EXP) || 3600;
const refreshExp = Number(process.env.REFRESH_TOKEN_EXP) || 604800;

export const generateAccessToken = async (payload: any) => {
  const now = Math.floor(Date.now() / 1000);
  // console.log(
  //   "access",
  //   await sign({ ...payload, exp: now + accessExp }, accessSecret)
  // );
  return await sign({ ...payload, exp: now + accessExp }, accessSecret);
};

export const generateRefreshToken = async (payload: any) => {
  const now = Math.floor(Date.now() / 1000);
  // console.log(
  //   "refresh",
  //   await sign({ ...payload, exp: now + refreshExp }, refreshSecret)
  // );
  return await sign({ ...payload, exp: now + refreshExp }, refreshSecret);
};

export const verifyAccessToken = (token: string) => verify(token, accessSecret);

export const verifyRefreshToken = (token: string) =>
  verify(token, refreshSecret);
