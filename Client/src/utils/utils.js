export function getStar(stars) {
  if (stars && stars.length === 5) {
    var totalStar = 0,
      sum = 0;
    var i = 1;
    for (var star of stars) {
      totalStar += i * star;
      sum += 1 * star;
      i++;
    }
    if (sum === 0) return 0;
    return Math.floor((totalStar / sum) * 10) / 10;
  }
  return 0;
}

export function totalNumRate(star) {
  return star.reduce((a, b) => a + b, 0);
}

export function sortTourDate(tour) {
  return {
    ...tour,
    tour: tour.tour.sort((a, b) => new Date(a.date) - new Date(b.date))
  };
}

export function extractProvinceTour(tour) {
  let provinces = [];
  for (const date of tour) {
    for (const event of date.events) {
      if (event.location?.province)
        provinces.push(event.location.province.fullname);
      if (event.service?.province)
        provinces.push(event.service.province.fullname);
    }
  }
  provinces = provinces.filter(item => !!item);
  return new Set(provinces);
}

export function extractLocationTour(tour) {
  let locations = [];
  for (const date of tour) {
    for (const event of date.events) {
      if (event.location) locations.push(event.location.fullname);
      if (event.service) locations.push(event.service.name);
    }
  }
  locations = locations.filter(item => !!item);
  return new Set(locations);
}
