import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'
import sampleData from "./sample-data";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

async function main() {
    const prisma = new PrismaClient({ adapter });
    await prisma.product.createMany({data: sampleData.products});
    console.log("Productos introducidos en la base de datos");
}

main();
