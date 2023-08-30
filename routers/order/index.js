import { Router } from "express";
import { allOrders, orderById } from "./query.js";
import { createOrder } from "./mutation.js";

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

orderRouter.get("/", allOrders);
orderRouter.post("/", createOrder);
orderRouter.get("/:id", orderById);
// orderRouter.post("/accept-order/:orderId/:driverId", acceptOrder);
// orderRouter.post("/reject-order/:orderId/:driverId", rejectOrder);
// orderRouter.post("/confirm-delivery/:orderId/:driverId", confirmDelivery);

export default orderRouter;
