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

const nearbyDrivers = async (req, res) => {
  const { lat, lng } = req.query;
  const drivers = await prisma.driver.findMany({
    where: {
      AND: [
        { isAvailable: true },
        {
          location: {
            near: {
              latitude: parseFloat(lat),
              longitude: parseFloat(lng),
            },
            distance: 1000,
          },
        },
      ],
    },
  });
  res.json({ drivers });
};

export {};
