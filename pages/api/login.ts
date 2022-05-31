// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import { setLoginSession } from "../../lib/auth";
import { claim } from "../../lib/constants";
import { prisma } from "../../lib/db";
import { LegendToggleOutlined } from "@mui/icons-material";

type Data = {
  done?: boolean;
};
type LoginData = {
  email: string;
  signature: string;
  wallet: string;
};
export default async function login(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") return;
  try {
    const publicAddress = req.headers.authorization?.substring(7);
    const reqData: LoginData = req.body;
    const recovered = ethers.utils.verifyMessage(claim, reqData.signature);
    if (recovered !== publicAddress) {
      throw new Error("Signature Invalid");
    }
    const user = await prisma.user.upsert({
      where: { avaxAddress: recovered },
      update: {},
      create: {
        avaxAddress: recovered,
      },
    });
    const metadata = {
      issuer: `did:ethr:${recovered}`, // required for Magic logging in/out
      publicAddress: recovered,
      wallet: reqData.wallet,
      id: user.id,
    };
    const session = { ...metadata };
    await setLoginSession(res, session);
    res.status(200).send({ done: true });
  } catch (error: any) {
    console.log(error);
    res.status(error.status || 500).end(error.message);
  }
  return;
}
