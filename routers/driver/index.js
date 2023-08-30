import { Router } from "express";
import { allDrivers, allDriversLocations } from "./query.js";
import {
  createDriver,
  deleteDriver,
  updateDriver,
  updateDriverLocation,
} from "./mutation.js";

const driverRouter = Router();

// -------------------------- GET
driverRouter.get("/", allDrivers);
driverRouter.get("/locations", allDriversLocations);

// -------------------------- POST
driverRouter.post("/", createDriver);

// -------------------------- PUT
driverRouter.patch("/id/:identifier", updateDriver);
driverRouter.patch("/id/:identifier/location", updateDriverLocation);

// -------------------------- DELETE
driverRouter.delete("/id/:identifier", deleteDriver);

export default driverRouter;
