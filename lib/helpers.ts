import cookie from "cookie";
import { NextApiRequest } from "next";
import { ethers } from "ethers";

export function parseCookies(req: NextApiRequest) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}

export function numberWithCommas(x: string) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function numberWithCommasAndDecimals(x: string) {
  //   let y = x.length < 6 ? x : x.substring(0, x.length - 6);
  return ethers.utils.parseUnits(x, 6);
}
