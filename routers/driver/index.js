import { Router } from "express";
import {
  allDrivers,
  allDriversLocations,
  driverByIdentifier,
} from "./query.js";
import {
  createDriver,
  deleteDriver,
  updateDriver,
  updateDriverLocation,
} from "./mutation.js";

/**
 * @swagger
 * components:
 *   schemas:
 *    CreateDriverInput:
 *     type: object
 *     required:
 *      - identifier
 *     properties:
 *      identifier:
 *       type: string
 *       description: The driver's identifier
 *      location:
 *       type: array
 *       items:
 *        type: number
 *       description: The driver's location
 *     example:
 *      identifier: "64ee989a84e44d30b2725a1b"
 *      location: [ 27.199869,-13.229834]
 *    Driver:
 *     type: object
 *     required:
 *      - identifier
 *     properties:
 *      identifier:
 *       type: string
 *       description: The driver's identifier
 *      location:
 *       type: array
 *       items:
 *        type: number
 *       description: The driver's location
 *      createdAt:
 *        type: date
 *       description: The date of the driver's creation
 *      updatedAt:
 *       type: date
 *      description: The date of the driver's last update
 *      orders:
 *        type: array
 *     example:
 *      identifier: "64ee989a84e44d30b2725a1b"
 *      location: [ 27.199869,-13.229834]
 *      createdAt: "2021-05-02T15:00:00.000Z"
 *      updatedAt: "2021-05-02T15:00:00.000Z"
 *      orders: []
 *
 */
const driverRouter = Router();

// -------------------------- GET
driverRouter.get("/", allDrivers);
driverRouter.get("/id/:identifier", driverByIdentifier);
driverRouter.get("/locations", allDriversLocations);

// -------------------------- POST
driverRouter.post("/", createDriver);

// -------------------------- PUT
driverRouter.patch("/id/:identifier", updateDriver);
driverRouter.patch("/id/:identifier/location", updateDriverLocation);

// -------------------------- DELETE
driverRouter.delete("/id/:identifier", deleteDriver);

export default driverRouter;
