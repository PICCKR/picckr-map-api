import { Router } from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import locationRouter from "./location/index.js";
// import chatRouter from "./chat/index.js";
import orderRouter from "./order/index.js";
import driverRouter from "./driver/index.js";
import { SwaggerSpec } from "./swagger.js";

const routers = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

routers.use("/location", locationRouter);
// routers.use("/chat", chatRouter);
routers.use("/order", orderRouter);
routers.use("/driver", driverRouter);

routers.get("/", (req, res) => {
  return res.json({
    message: "Welcome to the PicckR Map API",
  });
});

routers.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(SwaggerSpec);
});

routers.get("/assets/swagger.json", (req, res) => {
  const jsonFilePath = path.join(__dirname, "../../assets", "swagger.json");
  // Send the JSON file as a response
  res.sendFile(jsonFilePath);
});

export default routers;
