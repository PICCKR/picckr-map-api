import { Router } from "express";
import locationRouter from "./location/index.js";
import chatRouter from "./chat/index.js";
import orderRouter from "./order/index.js";

const routers = Router();

routers.use("/location", locationRouter);
routers.use("/chat", chatRouter);
routers.use("/order", orderRouter);

routers.get("/", (req, res) => {
  return res.json({
    message: "Welcome to the PicckR Map API",
  });
});

export default routers;
