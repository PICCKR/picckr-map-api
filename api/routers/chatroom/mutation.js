import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const openChatRoom = async (req, res) => {
  const { trackerId } = req.body;

  try {
    const chatRoom = await prisma.chatRoom.create({
      data: {
        trackerId,
      },
    });
    return res.status(201).json(chatRoom);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { openChatRoom };
