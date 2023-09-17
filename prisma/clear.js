import { PrismaClient } from "@prisma/client";

import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.MODE == "DEV" ? process.env.DATABASE_URL : process.env.PROD_DATABASE_URL,
      },
    },
  });

async function clearDatabase() {
  try {
    // Delete all records from the Driver table
    await prisma.driver.deleteMany({});

    // Add similar deleteMany statements for other tables/models if needed

    console.log('Database cleared successfully');
  } catch (error) {
    console.error('Error clearing the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Call the clearDatabase function to clear the database
clearDatabase();
