import { Router } from "express";
import { allOrders, orderById } from "./query.js";
import { createOrder, deleteOrder } from "./mutation.js";

const orderRouter = Router();

function acceptOrder(req, res) {
  const { orderId, driverId } = req.params;

  return res.json({
    orderId,
    driverId,
  });
}

function rejectOrder(req, res) {
  const { orderId, driverId } = req.params;

  return res.json({
    orderId,
    driverId,
  });
}

function confirmDelivery(req, res) {
  const { orderId, driverId } = req.params;

  return res.json({
    orderId,
    driverId,
  });
}

// -------------------- GET
orderRouter.get("/", allOrders);
orderRouter.get("/id/:id", orderById);

// -------------------- POST
orderRouter.post("/", createOrder);

// -------------------- DELETE
orderRouter.delete("/id/:id", deleteOrder);

export default orderRouter;
