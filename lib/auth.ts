import { MAX_AGE, setTokenCookie, getTokenCookie } from "./auth-cookies";
import { NextApiResponse, NextApiRequest } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";

const TOKEN_SECRET = process.env.TOKEN_SECRET!;

export async function setLoginSession(res: NextApiResponse, session: Object) {
  const createdAt = Date.now();
  // Create a session object with a max age that we can validate later
  const obj = { ...session, createdAt, maxAge: MAX_AGE };
  const token = jwt.sign(obj, TOKEN_SECRET);
  console.log(token);
  setTokenCookie(res, token);
}

export async function getLoginSession(req: NextApiRequest) {
  const token = getTokenCookie(req);

  if (!token) return;
  const session = jwt.verify(token, TOKEN_SECRET) as JwtPayload;
  const expiresAt = session.createdAt + session.maxAge * 1000;

  // Validate the expiration date of the session
  if (Date.now() > expiresAt) {
    throw new Error("Session expired");
  }

  return session;
}
