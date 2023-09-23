import { Router } from "express";
import { saveDecline } from "./mutation.js";

const declineRouter = Router();

declineRouter.post("/", saveDecline);

export default declineRouter;
