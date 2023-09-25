import { PrismaClient } from "@prisma/client";
import { getClosestLocations } from "../../utils/index.js";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();

function getGoogleMapsEndpoint({ origin, destinations }) {
  return `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&destinations=${destinations}&origins=${origin}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
}

const findNearbyDrivers = async (req, res) => {
  const { senderLocation, driversLocations } = req.body;
  const nbr = req.params.max || 10;

  try {
    const request_url = getGoogleMapsEndpoint({
      origin: senderLocation,
      destinations: driversLocations
        .map((driver) => {
          return driver.location;
        })
        .join(" | "),
    });

    const response = await fetch(request_url);
    const data = await response.json();

    const closestLocations = getClosestLocations(
      data,
      driversLocations.map((driver) => {
        return driver.driverId;
      }),
      driversLocations.map((driver) => {
        return driver.location;
      }),
      nbr
    );

    res.status(200).json(closestLocations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTrackerById = async (req, res) => {
  try {
    const { id } = req.params;
    const tracker = await prisma.tracker.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json(tracker);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { findNearbyDrivers, getTrackerById };
