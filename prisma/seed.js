import { PrismaClient } from "@prisma/client";
import {drivers} from "./data.js"

import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.MODE == "DEV" ? process.env.DATABASE_URL : process.env.PROD_DATABASE_URL,
      },
    },
  });

async function seed() {
  for (const data of drivers) {
    await prisma.driver.create({
      data,
    });
    console.log(`Created Driver: ${data.identifier}`);
  }
}

seed()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
