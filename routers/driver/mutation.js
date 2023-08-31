import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createDriver = async (req, res) => {
  const { identifier } = req.body;
  const driver = await prisma.driver.findUnique({
    where: {
      identifier,
    },
  });
  if (driver) {
    return res.status(409).json({ error: "Driver already exists" });
  }

  try {
    const driver = await prisma.driver.create({
      data: req.body,
    });
    res.json(driver);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateDriver = async (req, res) => {
  const { identifier } = req.params;
  try {
    const driver = await prisma.driver.update({
      where: {
        identifier,
      },
      data: req.body,
    });
    res.json(driver);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateDriverLocation = async (req, res) => {
  const { location } = req.body;
  if (!location || location.length !== 2) {
    return res
      .status(400)
      .json({ error: "Location is required to be a list of 2 numbers" });
  }
  const { identifier } = req.params;
  try {
    const driver = await prisma.driver.update({
      where: {
        identifier,
      },
      data: {
        location: {
          set: location,
        },
      },
    });
    res.json(driver.location);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteDriver = async (req, res) => {
  const { identifier } = req.params;
  try {
    const driver = await prisma.driver.delete({
      where: {
        identifier,
      },
    });
    res.json(driver);
  } catch (error) {
    res.status(404).json({
      message: "Driver not found",
      error: error,
    });
  }
};

export { createDriver, updateDriver, updateDriverLocation, deleteDriver };
