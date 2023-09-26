import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const saveDecline = async (req, res) => {
  try {
    const declinedObject = await prisma.decline.create({
      data: {
        ...req.body,
      },
    });
    res.status(201).json(declinedObject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDecline = async (req, res) => {
  const { id } = req.params;

  try {
    const decline = await prisma.decline.update({
      where: {
        id: id,
      },
      data: {
        ...req.body,
      },
    });
    res.status(200).json(decline);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDecline = async (req, res) => {
  const { id } = req.params;

  try {
    const decline = await prisma.decline.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json(decline);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { saveDecline, deleteDecline, updateDecline };
