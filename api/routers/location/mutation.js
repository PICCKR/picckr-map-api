import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { getClosestLocations } from "../../utils/index.js";


dotenv.config();
const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.MODE == "DEV" ? process.env.DATABASE_URL : process.env.PROD_DATABASE_URL,
      },
    },
  });

function getGoogleMapsEndpoint({ origin, destinations }) {
  return `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&destinations=${destinations}&origins=${origin}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
}

const nearbyDrivers = async (req, res) => {
  const { targetLocation } = req.body;
  const nbr = req.params.max || 10;

  const driversLocations = await prisma.driver.findMany({
    select: {
      location: true,
      identifier: true,
    },
  });

  const request_url = getGoogleMapsEndpoint({
    origin: targetLocation,
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
      return driver.identifier;
    }),
    driversLocations.map((driver) => {
      return driver.location;
    }),
    nbr
  );

  res.json(closestLocations);
};

export { nearbyDrivers };
