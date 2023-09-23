import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createTracker = async (req, res) => {
  const { senderId, bookingId, senderLocation, recipientLocation } = req.body;

  try {
    const tracker = await prisma.tracker.create({
      data: {
        senderId,
        bookingId,
        senderLocation,
        recipientLocation,
      },
    });

    res.status(201).json(tracker);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTracker = async (req, res) => {
  const { id } = req.params;

  try {
    // check if id exists
    const tracker = await prisma.tracker.findUnique({
      where: { id: id },
    });
    if (!tracker) {
      return res.status(404).json({ error: "Tracker not found" });
    }

    // check if there's a chatroom with id, if not create it
    let chatRoom = await prisma.chatRoom.findUnique({
      where: { trackerId: id },
    });
    if (!chatRoom) {
      chatRoom = await prisma.chatRoom.create({
        data: {
          trackerId: id,
        },
      });
    }

    // check if there's a spentTime, else calculate spenttime between creation and now
    let spentTime = tracker.spentTime;
    if (!spentTime) {
      const createdDate = tracker.createdAt;
      const now = new Date();
      const difference = now.getTime() - createdDate.getTime();
      spentTime = Math.floor(difference / 1000);
    }

    // check if pinCode exists, else generate a pin code of 6 digits
    let pinCode = tracker.pinCode;
    if (!pinCode) {
      pinCode = Math.floor(100000 + Math.random() * 900000);
    }

    // update tracker
    const updatedTracker = await prisma.tracker.update({
      where: { id: id },
      data: {
        ...req.body,
        spentTime: spentTime,
        pinCode: pinCode,
      },
    });

    res.status(200).json({
      tracker: updatedTracker,
      chatRoom: chatRoom,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createTracker, updateTracker };
