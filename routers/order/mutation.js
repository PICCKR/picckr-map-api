import { PrismaClient, Reply, Status } from "@prisma/client";

const prisma = new PrismaClient();

const createOrder = async (req, res) => {
  const { bookingId } = req.body;
  const order = await prisma.order.create({
    data: {
      bookingId: bookingId,
    },
  });
  return res.json(order);
};

const sendOrder = async (req, res) => {
  const { orderId, driversIds } = req.body;
};

const saveOrder = async (req, res) => {
  const { orderId, driverId, reply } = req.body;
  const order = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      driverId: driverId,
      reply: Reply[reply],
    },
  });
  return res.json(order);
};

const completeOrder = async (req, res) => {
  const { orderId } = req.body;
  const order = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: Status.COMPLETED,
    },
  });
  return res.json(order);
};

export { createOrder };
