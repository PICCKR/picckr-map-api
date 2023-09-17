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

const allDrivers = async (req, res) => {
  try {
    const drivers = await prisma.driver.findMany();
    res.status(200).json(drivers);
  } catch (error) {
    console.error("Error fetching drivers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const driverByIdentifier = async (req, res) => {
  const { identifier } = req.params;
  try {
    const driver = await prisma.driver.findUnique({
      where: {
        identifier: identifier,
      },
    });
    return res.json(driver);
  } catch (err) {
    return res.status(404).json({
      message: "Driver not found",
      error: err.message,
    });
  }
};

const allDriversLocations = async (req, res) => {
  try {
    const drivers = await prisma.driver.findMany({
      select: {
        location: true,
        identifier: true,
      },
    });
    res.json(drivers);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export { allDrivers, allDriversLocations, driverByIdentifier };
