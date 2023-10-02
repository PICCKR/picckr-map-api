const getClosestLocations = (
  data,
  driversIdsList,
  driversLocationsList,
  nbr
) => {
  const sortedDistancesWithLocationList = data.rows[0].elements
    .map((element, index) => {
      return {
        distance: element.distance,
        address: data.destination_addresses[index],
        duration: element.duration,
        driverId: driversIdsList[index],
        location: driversLocationsList[index],
      };
    })
    .sort((a, b) => a.distance.value - b.distance.value);

  const tenClosestLocations = sortedDistancesWithLocationList.slice(0, nbr);

  return tenClosestLocations;
};

export { getClosestLocations };
