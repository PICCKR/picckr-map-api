import { calculateDistance } from "../../utils/index.js";

const findNearbyLocations = (req, res) => {
  const { refLocation, locations, maxDistance } = req.body;

  if (!refLocation || !locations || !maxDistance) {
    return res.status(400).json({
      message: "Missing required fields",
    });
  }
  if (!Array.isArray(refLocation) || !Array.isArray(locations)) {
    return res.status(400).json({
      message: "Invalid data type",
    });
  }
  if (refLocation.length !== 2) {
    return res.status(400).json({
      message: "Invalid refLocation",
    });
  }
  try {
    const nearbyCredentials = [];
    const [refLat, refLong] = refLocation;

    for (const credential of locations) {
      const [lat, long] = credential;
      const distance = calculateDistance(refLat, refLong, lat, long);

      if (distance <= maxDistance) {
        nearbyCredentials.push({
          credential,
          distance,
        });
      }
    }
    return res.json(nearbyCredentials.sort((a, b) => a.distance - b.distance));
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      error: err,
    });
  }
};

export { findNearbyLocations };
