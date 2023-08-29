import { Router } from "express";

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

orderRouter.post("/accept-order/:orderId/:driverId", acceptOrder);
orderRouter.post("/reject-order/:orderId/:driverId", rejectOrder);
orderRouter.post("/confirm-delivery/:orderId/:driverId", confirmDelivery);

export default orderRouter;
