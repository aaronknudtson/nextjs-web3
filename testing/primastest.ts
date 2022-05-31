import { PrismaClient } from "@prisma/client";

async function main() {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: { avaxAddress: "0x03D493CCbF5982bcb747646eAA0C42A21087cba3" },
  });
  console.log(user);
}

main();
