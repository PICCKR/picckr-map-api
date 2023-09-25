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

// messageData from socket.io on "send-message" event
const sendMessage = async (messageData) => {
  try {
    const { content, ownerId, chatRoomId } = messageData;

    const message = await prisma.message.create({
      data: {
        content,
        ownerId,
        chatRoomId,
      },
    });

    // TODO: emit message to chatRoomId
    return message;
  } catch (error) {
    return { error: error.message };
  }
};

const deleteChatRoomByTrackerId = async (req, res) => {
  const { id } = req.params;

  try {
    const chatRoom = await prisma.chatRoom.delete({
      where: {
        trackerId: id,
      },
    });
    return res.status(200).json(chatRoom);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { openChatRoom, sendMessage, deleteChatRoomByTrackerId };
