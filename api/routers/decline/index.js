import { Router } from "express";
import { deleteDecline, saveDecline, updateDecline } from "./mutation.js";
import {
  getAllCancels,
  getAllDeclines,
  getAllDeclinesByDriverId,
  getAllDisputes,
  getDeclineById,
  getDeclinesByTrackerId,
} from "./query.js";

const declineRouter = Router();

declineRouter.post("/", saveDecline);
declineRouter.get("/", getAllDeclines);
declineRouter.delete("/id/:id", deleteDecline);
declineRouter.patch("/id/:id", updateDecline);
declineRouter.get("/id/:id", getDeclineById);
declineRouter.get("/trackerid/:id", getDeclinesByTrackerId);
declineRouter.get("/driverid/:id", getAllDeclinesByDriverId);
declineRouter.get("/cancels", getAllCancels);
declineRouter.get("/disputes", getAllDisputes);

export default declineRouter;
