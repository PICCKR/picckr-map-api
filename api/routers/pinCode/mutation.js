import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createPinCode = async (req, res) => {
  const { phone, code } = req.body;
  //   check if phone exists
  const pinCode = await prisma.pinCode.findFirst({
    where: {
      phone,
      expiresAt: {
        gt: new Date(),
      },
    },
  });
  if (pinCode) {
    return res.status(400).json({
      error: `Pin code already exists and it expires in ${pinCode.expiresAt}`,
    });
  }
  //  create pin code
  const newPinCode = await createPinCodeFct(phone, code);
  if (newPinCode instanceof Error) {
    return res.status(400).json({ error: newPinCode.message });
  }
  return res.json(newPinCode);
};

const createPinCodeFct = async (phone, code) => {
  const expiresAt = new Date() + 10 * 60 * 1000; // 10 minutes

  try {
    const pinCode = await prisma.pinCode.create({
      data: {
        phone,
        code,
        expiresAt,
      },
    });
    return pinCode;
  } catch (error) {
    return error;
  }
};

const verifyPinCode = async (req, res) => {
  const { phone, code } = req.body;

  const pinCode = await verifyPinCodeFct(phone, code);
  if (pinCode instanceof Error) {
    return res.status(400).json({ error: pinCode.message });
  }
  if (!pinCode) {
    return res.status(400).json({ error: "No pin code found" });
  }

  if (pinCode.expiresAt < new Date()) {
    return res.status(400).json({ error: "Pin code expired" });
  }

  if (pinCode.used) {
    return res.status(400).json({ error: "Pin code already used" });
  }

  //  update pin code
  try {
    const updatedPinCode = await prisma.pinCode.update({
      where: {
        id: pinCode.id,
      },
      data: {
        used: true,
      },
    });
    return res.json(updatedPinCode);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const verifyPinCodeFct = async (phone, code) => {
  try {
    const pinCode = await prisma.pinCode.findFirst({
      where: {
        phone,
        code,
      },
    });
    return pinCode;
  } catch (error) {
    return error;
  }
};

export { createPinCode, verifyPinCode };
