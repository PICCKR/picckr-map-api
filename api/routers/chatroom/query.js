import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllChatRooms = async (req, res) => {
  try {
    const chatRooms = await prisma.chatRoom.findMany();
    res.status(200).json(chatRooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getChatRoomByTrackerId = async (req, res) => {
  try {
    const { id } = req.params;
    const chatRoom = await prisma.chatRoom.findUnique({
      where: {
        trackerId: id,
      },
    });
    res.status(200).json(chatRoom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getAllChatRooms, getChatRoomByTrackerId };
