// Set of titles for sortKind values
export const titleSortRestaurants = new Map();
titleSortRestaurants.set(0, '[none]');
titleSortRestaurants.set(1, 'best match');
titleSortRestaurants.set(2, 'newest');
titleSortRestaurants.set(3, 'rating average');
titleSortRestaurants.set(4, 'distance');
titleSortRestaurants.set(5, 'popularity');
titleSortRestaurants.set(6, 'average product price');
titleSortRestaurants.set(7, 'delivery costs');
titleSortRestaurants.set(8, 'minimum costs');
titleSortRestaurants.set(9, 'top restaurant');

// Set of property names for "restaurants.sortingValues" object
export const propertySortRestaurants = new Map();
propertySortRestaurants.set(0, '');
propertySortRestaurants.set(1, 'bestMatch');
propertySortRestaurants.set(2, 'newest');
propertySortRestaurants.set(3, 'ratingAverage');
propertySortRestaurants.set(4, 'distance');
propertySortRestaurants.set(5, 'popularity');
propertySortRestaurants.set(6, 'averageProductPrice');
propertySortRestaurants.set(7, 'deliveryCosts');
propertySortRestaurants.set(8, 'minCost');
propertySortRestaurants.set(9, 'topRestaurants');

// Set of compare functions to sort "restaurants" array depending on sortKind value
export const compareSortRestaurants = new Map();
compareSortRestaurants.set(0, (a, b) => 0);
compareSortRestaurants.set(1, (a, b) => {
  return b.sortingValues.bestMatch - a.sortingValues.bestMatch;
});
compareSortRestaurants.set(2, (a, b) => {
  return b.sortingValues.newest - a.sortingValues.newest;
});
compareSortRestaurants.set(3, (a, b) => {
  return b.sortingValues.ratingAverage - a.sortingValues.ratingAverage;
});
compareSortRestaurants.set(4, (a, b) => {
  return b.sortingValues.distance - a.sortingValues.distance;
});
compareSortRestaurants.set(5, (a, b) => {
  return b.sortingValues.popularity - a.sortingValues.popularity;
});
compareSortRestaurants.set(6, (a, b) => {
  return b.sortingValues.averageProductPrice - a.sortingValues.averageProductPrice;
});
compareSortRestaurants.set(7, (a, b) => {
  return b.sortingValues.deliveryCosts - a.sortingValues.deliveryCosts;
});
compareSortRestaurants.set(8, (a, b) => {
  return b.sortingValues.minCost - a.sortingValues.minCost;
});
compareSortRestaurants.set(9, (a, b) => {
  return b.sortingValues.topRestaurants - a.sortingValues.topRestaurants;
});
