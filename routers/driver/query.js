import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const allDrivers = async (req, res) => {
  try {
    const drivers = await prisma.driver.findMany();
    res.status(200).json(drivers);
  } catch (error) {
    console.error("Error fetching drivers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const allDriversLocations = async (req, res) => {
  const drivers = await prisma.driver.findMany({
    select: {
      location: true,
      identifier: true,
    },
  });
  res.json(drivers);
};

export { allDrivers, allDriversLocations };
