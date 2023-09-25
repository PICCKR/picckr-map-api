import { Router } from "express";
import { deleteDecline, saveDecline } from "./mutation.js";
import {
  getAllDeclines,
  getAllDeclinesByDriverId,
  getDeclineById,
  getDeclinesByTrackerId,
} from "./query.js";

const declineRouter = Router();

declineRouter.post("/", saveDecline);
declineRouter.get("/", getAllDeclines);
declineRouter.delete("/id/:id", deleteDecline);
declineRouter.get("/id/:id", getDeclineById);
declineRouter.get("/trackerid/:id", getDeclinesByTrackerId);
declineRouter.get("/driverid/:id", getAllDeclinesByDriverId);

export default declineRouter;
