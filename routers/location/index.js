import { Router } from "express";
import { findNearbyLocations } from "./mutation.js";

const locationRouter = Router();

function fetchNearbyDriversLocations(req, res) {
  const { latitude, longitude } = req.query;

  return res.json({
    latitude,
    longitude,
  });
}

function trackDriver(req, res) {
  const { driverId } = req.params;

  return res.json({
    driverId,
  });
}

// locationRouter.get("/nearby-drivers", fetchNearbyDriversLocations);
locationRouter.post("/nearby-locations", findNearbyLocations);
// locationRouter.get("/track-driver/:driverId", trackDriver);

export default locationRouter;
