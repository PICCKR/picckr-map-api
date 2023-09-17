import { PrismaClient, Reply, Status } from "@prisma/client";

import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.MODE == "DEV" ? process.env.DATABASE_URL : process.env.PROD_DATABASE_URL,
      },
    },
  });

const createOrder = async (req, res) => {
  const { bookingId } = req.body;
  const orderExists = await prisma.order.findFirst({
    where: {
      bookingId: bookingId,
    },
  });
  if (orderExists) {
    return res.status(409).json({
      message: `Order with bookingId ${bookingId} already exists`,
    });
  }
  try {
    const order = await prisma.order.create({
      data: {
        bookingId: bookingId,
      },
    });
    return res.json(order);
  } catch (error) {
    return res.status(400).json({
      message: `Order with bookingId ${bookingId} was not created`,
      error: error,
    });
  }
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

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.order.delete({
      where: {
        id: id,
      },
    });
    return res.json({
      message: `Order with id ${id} was deleted`,
    });
  } catch (error) {
    return res.status(400).json({
      message: `Order with id ${id} was not deleted`,
      error: error,
    });
  }
};

export { createOrder, deleteOrder };
