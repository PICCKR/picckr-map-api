import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllDeclines = async (req, res) => {
  try {
    const declines = await prisma.decline.findMany({
      where: {
        type: null,
      },
    });
    res.status(200).json(declines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDeclinesByTrackerId = async (req, res) => {
  const { id } = req.params;

  try {
    const decline = await prisma.decline.findMany({
      where: {
        trackerId: id,
      },
    });
    res.status(200).json(decline);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllDeclinesByDriverId = async (req, res) => {
  const { id } = req.params;

  try {
    const decline = await prisma.decline.findMany({
      where: {
        driverId: id,
      },
    });
    res.status(200).json(decline);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDeclineById = async (req, res) => {
  const { id } = req.params;

  try {
    const decline = await prisma.decline.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json(decline);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCancels = async (req, res) => {
  try {
    const cancels = await prisma.decline.findMany({
      where: {
        type: "CANCEL",
      },
    });
    res.status(200).json(cancels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllDisputes = async (req, res) => {
  try {
    const disputes = await prisma.decline.findMany({
      where: {
        type: "DISPUTE",
      },
    });
    res.status(200).json(disputes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllDeclinesBySenderId = async (req, res) => {
  const { id } = req.params;

  try {
    const decline = await prisma.decline.findMany({
      where: {
        senderId: id,
      },
    });
    res.status(200).json(decline);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getAllDeclines,
  getDeclinesByTrackerId,
  getAllDeclinesByDriverId,
  getDeclineById,
  getAllCancels,
  getAllDisputes,
  getAllDeclinesBySenderId,
};
