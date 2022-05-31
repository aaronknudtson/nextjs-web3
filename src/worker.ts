import { ethers } from "ethers";
import { prisma } from "../lib/db";

// Get pending transactions
async function doSomething() {
  console.log("doing some work");
}

// run every 60 seconds
setInterval(doSomething, 60 * 1000);
