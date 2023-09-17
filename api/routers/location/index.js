import { Router } from "express";
import {nearbyDrivers} from "./mutation.js"


const locationRouter = Router();

locationRouter.post("/nearby/drivers/:max", nearbyDrivers);

export default locationRouter;
