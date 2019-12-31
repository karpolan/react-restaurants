import { getStorage, setStorage } from './storage';

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
titleSortRestaurants.set(10, 'best restaurant');

// Set of property names for "restaurants.sortingValues" object by sortKind values
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
propertySortRestaurants.set(10, 'bestRestaurants');

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
  // asc for distance
  return a.sortingValues.distance - b.sortingValues.distance;
});
compareSortRestaurants.set(5, (a, b) => {
  return b.sortingValues.popularity - a.sortingValues.popularity;
});
compareSortRestaurants.set(6, (a, b) => {
  // asc for averageProductPrice
  return a.sortingValues.averageProductPrice - b.sortingValues.averageProductPrice;
});
compareSortRestaurants.set(7, (a, b) => {
  // asc for deliveryCosts
  return a.sortingValues.deliveryCosts - b.sortingValues.deliveryCosts;
});
compareSortRestaurants.set(8, (a, b) => {
  // asc for minCost
  return a.sortingValues.minCost - b.sortingValues.minCost;
});
compareSortRestaurants.set(9, (a, b) => {
  return b.sortingValues.topRestaurants - a.sortingValues.topRestaurants;
});
compareSortRestaurants.set(10, (a, b) => {
  return b.sortingValues.bestRestaurants - a.sortingValues.bestRestaurants;
});

/**
 * Extends loaded from API/Backend data with calculated values and local identifiers
 */
export function extendRestaurantsData() {
  const storage = getStorage();

  // Set ID, isFavorite and topRestaurant for 'restaurants'
  if (Array.isArray(storage.restaurants)) {
    for (let i = 0; i < storage.restaurants.length; i++) {
      let r = storage.restaurants[i];
      if (r) {
        if (!r.id) r.id = i;
        if (!r.isFavorite) r.isFavorite = false;
        /* 
Customers are more willing to order at restaurants near them. As we also like to promote
restaurants with high scores, we need to calculate a new sort method called top
restaurant . Use the following formula to calculate top restaurants:
topRestaurants = ((distance * popularity) + rating average) .

Actually the formula should be something like: 
bestRestaurants = (rating average + popularity) / distance
*/

        r.sortingValues.topRestaurants =
          r.sortingValues.distance * r.sortingValues.popularity + r.sortingValues.ratingAverage;

        r.sortingValues.bestRestaurants =
          (1000 * (r.sortingValues.ratingAverage + r.sortingValues.popularity)) / r.sortingValues.distance;
      }
    }
  }

  setStorage({ ...storage, isDataExtended: true });
}

/**
 * Returns array of restaurants sorted by "status" state: open -> order ahead -> closed.
 */
function sortRestaurantsDefault(list) {
  let top = [];
  let middle = [];
  let bottom = [];

  for (let i = 0; i < list.length; i++) {
    let item = list[i];
    // Compare text from short to long
    if (item.status === 'open') top.push(item);
    else if (item.status === 'closed') bottom.push(item);
    else middle.push(item);
  }
  return [...top, ...middle, ...bottom];
}

/**
 * Returns true if there is at least one item in the given List with "isFavorite" flag set.
 */
function isFavoriteExist(list) {
  for (let item of list) {
    if (item.isFavorite) return true;
  }
  return false;
}

/**
 * Sort function to move "favorite" item to the top.
 */
function sortByFavorites(a, b) {
  if (a.isFavorite === false && b.isFavorite === true) return 1;
  if (a.isFavorite === true && b.isFavorite === false) return -1;
  return 0;
}

/**
 * Returns array of restaurants depending on Search Text, Sorting Kind and Favorite state.
 * Favorites on the top and also sorted by sortKind value.
 * @param {*} list
 * @param {*} searchText
 * @param {*} sortKind
 */
export function getFilteredRestaurantsList(list, searchText = '', sortKind = 0) {
  let result = [];

  // Text Search filter (ignore case)
  const search = searchText.trim().toLowerCase();
  if (search !== '') {
    for (let i = 0; i < list.length; i++) {
      if (list[i].name.toLowerCase().includes(search)) result.push(list[i]);
    }
  } else {
    result = [...list];
  }

  // We are sorting elements of array depending on the current sortKind or by default sorting.
  if (sortKind < 1 || sortKind >= compareSortRestaurants.length) result = sortRestaurantsDefault(result);
  else result.sort(compareSortRestaurants.get(sortKind));

  // Run thru array again moving every found favorite to the top, that makes multiply favorites be sorted in the same way.
  if (isFavoriteExist(result)) result.sort(sortByFavorites);

  return result;
}
