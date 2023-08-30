import { calculateDistance } from "../../utils/index.js";

const findNearbyLocations = (req, res) => {
  const { refLocation, locations, maxDistance } = req.body;

  const nearbyCredentials = [];
  const [refLat, refLong] = refLocation;

  for (const credential of locations) {
    const [lat, long] = credential;
    const distance = calculateDistance(refLat, refLong, lat, long);

    if (distance <= maxDistance) {
      nearbyCredentials.push(credential);
    }
  }

  res.json({ nearbyCredentials });
};

export { findNearbyLocations };
