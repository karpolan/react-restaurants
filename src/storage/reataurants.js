// Set of titles for sortKind values
export const sortKindRestaurants = new Map();
sortKindRestaurants.set(0, '[none]');
sortKindRestaurants.set(1, 'best match');
sortKindRestaurants.set(2, 'newest');
sortKindRestaurants.set(3, 'rating average');
sortKindRestaurants.set(4, 'distance');
sortKindRestaurants.set(5, 'popularity');
sortKindRestaurants.set(6, 'average product price');
sortKindRestaurants.set(7, 'delivery costs');
sortKindRestaurants.set(8, 'minimum costs');
sortKindRestaurants.set(9, 'top restaurant');


// Set of compare functions to sort "restaurants" array depending on sortKind value
export const compareKindRestaurants = new Map();
compareKindRestaurants.set(0, (a, b) => 0);
compareKindRestaurants.set(1, (a, b) => {
  return b.sortingValues.bestMatch - a.sortingValues.bestMatch;
});
compareKindRestaurants.set(2, (a, b) => {
  return b.sortingValues.newest - a.sortingValues.newest;
});
compareKindRestaurants.set(3, (a, b) => {
  return b.sortingValues.ratingAverage - a.sortingValues.ratingAverage;
});
compareKindRestaurants.set(4, (a, b) => {
  return b.sortingValues.distance - a.sortingValues.distance;
});
compareKindRestaurants.set(5, (a, b) => {
  return b.sortingValues.popularity - a.sortingValues.popularity;
});
compareKindRestaurants.set(6, (a, b) => {
  return b.sortingValues.averageProductPrice - a.sortingValues.averageProductPrice;
});
compareKindRestaurants.set(7, (a, b) => {
  return b.sortingValues.deliveryCosts - a.sortingValues.deliveryCosts;
});
compareKindRestaurants.set(8, (a, b) => {
  return b.sortingValues.minCost - a.sortingValues.minCost;
});
compareKindRestaurants.set(9, (a, b) => {
  return b.sortingValues.topRestaurants - a.sortingValues.topRestaurants;
});
