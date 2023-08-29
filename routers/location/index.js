import { Router } from "express";

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

locationRouter.get("/nearby-drivers", fetchNearbyDriversLocations);
locationRouter.get("/track-driver/:driverId", trackDriver);

export default locationRouter;
