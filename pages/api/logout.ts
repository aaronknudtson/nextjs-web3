import { removeTokenCookie } from "../../lib/auth-cookies";
import { getLoginSession } from "../../lib/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { Magic } from "@magic-sdk/admin";
import { magicSessionStorage } from "../../lib/constants";
import { isDev } from "../../lib/config";

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getLoginSession(req);
    if (session) {
      if (session.wallet === magicSessionStorage && !isDev) {
        const mAdmin = new Magic(process.env.MAGIC_SECRET_KEY);
        await mAdmin.users.logoutByIssuer(session.issuer);
      }
      removeTokenCookie(res);
    }
  } catch (error) {
    console.error(error);
  }

  res.writeHead(302, { Location: "/login" });
  res.end();
}
