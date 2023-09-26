import { Router } from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import trackerRouter from "./tracker/index.js";
import { SwaggerSpec } from "./swagger.js";
import declineRouter from "./decline/index.js";
import chatRoomRouter from "./chatroom/index.js";

const routers = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

routers.use("/tracker", trackerRouter);
routers.use("/decline", declineRouter);
routers.use("/chatroom", chatRoomRouter);

routers.get("/", (req, res) => {
  return res.json({
    message: "Welcome to the PicckR Tracking API",
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
