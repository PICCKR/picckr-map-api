import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const saveDecline = async (req, res) => {
  const { declinedBy, spentTime, trackerId, driverId } = req.body;

  try {
    const declinedObject = await prisma.decline.create({
      data: {
        declinedBy,
        spentTime,
        trackerId,
        driverId,
      },
    });
    res.status(201).json(declinedObject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { saveDecline };
