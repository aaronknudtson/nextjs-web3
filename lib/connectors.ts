import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletLink from "walletlink";
import * as encoding from "@walletconnect/encoding";
import {
  appChainId,
  claim,
  magicSessionStorage,
  web3SessionStorage,
} from "./constants";
import { NextRouter } from "next/router";
import { ActiveUser } from "../hooks/useUser";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";

// more global variables
const rpc = process.env.RPC_AVALANCHE!;

const providerOptions = {
  injected: {
    // metamask
    package: null,
    chainId: appChainId,
  },
  // walletconnect: {
  //   package: WalletConnectProvider,
  //   options: {
  //     rpc: {
  //       1: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  //       43114: "https://api.avax.network/ext/bc/C/rpc",
  //     },
  //     // chainId: 43114,
  //     // qrcodeModalOptions: {
  //     //   mobileLinks: ["metamask", "trust"],
  //     // },
  //   },
  // },
  // "custom-walletlink": {
  //   // coinbase browser wallet
  //   display: {
  //     logo: "https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0",
  //     name: "Coinbase",
  //     description: "Connect to Coinbase Browser Wallet",
  //   },
  //   options: {
  //     appName: "Coinbase", // Your app name
  //     networkUrl: rpc,
  //     chainId: appChainId,
  //   },
  //   package: WalletLink,
  //   connector: async (options: any) => {
  //     const { appName, networkUrl, chainId } = options;
  //     const walletLink = new WalletLink({
  //       appName,
  //     });
  //     const provider = walletLink.makeWeb3Provider(networkUrl, chainId);
  //     await provider.enable();
  //     return provider;
  //   },
  // },
};

const handleSignIn = async (
  provider: ethers.providers.Web3Provider,
  router: NextRouter,
  wallet: string
) => {
  const signer = await provider.getSigner();
  const signature = await signer.signMessage(claim);
  const reqData = { signature: signature, wallet: wallet };
  const address = await signer.getAddress();
  const res = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + address,
    },
    body: JSON.stringify(reqData),
  });
  // const data = await res.json();
  if (res.status === 200) {
    router.reload();
  } else {
    throw new Error(await res.text());
  }
};

// Used to login if someone chooses Magic
export async function loginMagic(email: string, router: NextRouter) {
  const magic = (await import("./magic")).magic; // must import on client side
  const provider = new ethers.providers.Web3Provider(magic.rpcProvider as any);
  const did = await magic.auth.loginWithMagicLink({ email: email });
  await handleSignIn(provider, router, magicSessionStorage);
}

// Used to connect any other web3 wallet
export async function loginWeb3Modal(router: NextRouter) {
  // This next line is supposed to pop up a modal; it seems to not work on localhost:3000. To test it properly test on 127.0.0.1:3000
  const web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions,
  });
  const instance = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(instance);
  const signer = await provider.getSigner();
  const [address] = await provider.listAccounts();
  const signature = await signer.signMessage(claim);

  console.log("past");
  const reqData = { signature: signature, wallet: web3SessionStorage };
  const res = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + address,
    },
    body: JSON.stringify(reqData),
  });
  // const data = await res.json();
  if (res.status === 200) {
    router.reload();
  } else {
    throw new Error(await res.text());
  }
}

export async function logoutConnector(user: ActiveUser) {
  if (user.wallet === web3SessionStorage) {
    const web3Modal = new Web3Modal({
      cacheProvider: true,
      providerOptions,
    });
    web3Modal.clearCachedProvider();
  }
  const res = await fetch("/api/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.publicAddress,
    },
  });
  return res.status;
}
