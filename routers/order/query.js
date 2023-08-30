import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const allOrders = async (req, res) => {
  const orders = await prisma.order.findMany();
  return res.json(orders);
};

const orderById = async (req, res) => {
  const { id } = req.params;
  const order = await prisma.order.findUnique({
    where: {
      id: id,
    },
  });
  return res.json(order);
};

export { allOrders, orderById };
