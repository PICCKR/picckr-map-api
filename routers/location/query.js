import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
