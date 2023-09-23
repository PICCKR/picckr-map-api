import { Router } from "express";
import { createTracker, updateTracker } from "./mutation.js";
import { findNearbyDrivers } from "./query.js";

const trackerRouter = Router();

trackerRouter.post("/", createTracker);
trackerRouter.post("/nearbydrivers/:max", findNearbyDrivers);
trackerRouter.patch("/id/:id", updateTracker);

export default trackerRouter;
