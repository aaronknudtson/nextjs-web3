import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { magicSessionStorage } from "../lib/constants";
import { useRouter } from "next/router";

const getCachedWallet = async (wallet: string) => {
  if (wallet == magicSessionStorage) {
    const magic = (await import("../lib/magic")).magic; // must import on client side
    const loggedIn = await magic.user.isLoggedIn();
    if (!loggedIn) return null;
    const provider = new ethers.providers.Web3Provider(
      magic.rpcProvider as any
    );
    return provider;
  } else {
    const web3Modal = new Web3Modal({
      cacheProvider: true,
    });
    if (web3Modal.cachedProvider) {
      const instance = await web3Modal.connect();
      return new ethers.providers.Web3Provider(instance);
    }
  }
  return null;
};

const fetcher = async (url: string) => {
  const r = await fetch(url);
  const data: UserData = await r.json();
  if (data.user === null) return { user: null };
  data.user.provider = await getCachedWallet(data.user.wallet);
  if (data.user.provider === null) return { user: null };
  data.user.signer = await data.user.provider?.getSigner();
  const address = await data.user.signer?.getAddress();
  if (address !== data.user.publicAddress) return { user: null };
  data.user.account = address;
  data.user.chainId = (await data.user.provider?.getNetwork())?.chainId;
  return { user: (data?.user as ActiveUser) || null };
};

interface RedirectTypes {
  redirectTo?: string;
  redirectIfFound?: boolean;
}

export interface ActiveUser {
  createdAt: number;
  issuer: string;
  maxAge: number;
  provider: ethers.providers.Web3Provider;
  publicAddress: string;
  signer: ethers.providers.JsonRpcSigner;
  wallet: string;
  account: string;
  chainId: number;
}

interface UserData {
  user: null | {
    createdAt: number;
    issuer: string;
    maxAge: number;
    publicAddress: string;
    provider: ethers.providers.Web3Provider | null;
    signer: ethers.providers.JsonRpcSigner | null;
    wallet: string;
    account: string;
    chainId: number;
  };
}

export function useUser({ redirectTo, redirectIfFound }: RedirectTypes) {
  const router = useRouter();
  const { data, error } = useSWR("/api/user", fetcher);
  const user = data?.user;
  const finished = Boolean(data);
  const hasUser = Boolean(user);
  if (user) {
    user.provider.on("networkChanged", (network) => {
      console.log(network);
      // router.reload();
    });
  }
  // useEffect(() => {
  //   if (!user) return;
  //   user.provider.on("networkChanged", () => {
  //     router.reload();
  //   });
  //   console.log(user.provider);
  // }, [user]);
  useEffect(() => {
    if (!redirectTo || !finished) return;
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !hasUser) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && hasUser)
    ) {
      router.push(redirectTo);
    }
  }, [redirectTo, redirectIfFound, finished, hasUser]);

  return error ? null : user;
}
