import { PrismaClient } from "@prisma/client";

import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.MODE == "DEV" ? process.env.DATABASE_URL : process.env.PROD_DATABASE_URL,
      },
    },
  });

const allOrders = async (req, res) => {
  const orders = await prisma.order.findMany();
  return res.json(orders);
};

const orderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: id,
      },
    });
    return res.json(order);
  } catch (err) {
    return res.status(404).json({
      message: "Order not found",
      error: err.message,
    });
  }
};

export { allOrders, orderById };
