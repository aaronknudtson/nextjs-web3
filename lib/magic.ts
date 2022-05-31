import { Magic } from "magic-sdk";
import { appChainId } from "./constants";
import { isDev } from "./config";

export const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY!, {
  network: {
    rpcUrl: process.env.NEXT_PUBLIC_RPC_AVALANCHE!,
    chainId: appChainId,
  },
  testMode: isDev,
});
