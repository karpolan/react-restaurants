import { extendRestaurantsData, getFilterdRestaurantsList} from "./reataurants";
import { getStorage, loadData } from "./storage";


it('extends "storage.restaurants" data', () => {
	loadData(true);
	let storage = getStorage();
	
	expect(storage.restaurants[0].id).toEqual(undefined);
	expect(storage.restaurants[5].id).toEqual(undefined);

	extendRestaurantsData(); // Actuall call
	
	expect(storage.restaurants[0].id).toEqual(0);
	expect(storage.restaurants[5].id).toEqual(5);

	expect(storage.restaurants[3].id).not.toBe(undefined);
	expect(storage.restaurants[3].isFavorite).not.toBe(undefined);
	expect(storage.restaurants[3].sortingValues.topRestaurants).not.toBe(undefined);
});


it('filters "storage.restaurants" array depending on user input', () => {
	loadData(true);
	extendRestaurantsData(); 
	let defaultList = [...getStorage().restaurants];

	// 0 3 4 5 11
	let list = getFilterdRestaurantsList(defaultList);
	expect(list[0].id).toEqual(0);
	expect(list[1].id).toEqual(3);
	expect(list[2].id).toEqual(4);
	expect(list[3].id).toEqual(5);
	expect(list[4].id).toEqual(11);

	// 0 17 1
	list = getFilterdRestaurantsList(defaultList,'ta');
	expect(list[0].id).toEqual(0);
	expect(list[1].id).toEqual(17);
	expect(list[2].id).toEqual(1);

	// 0  1 17
	list = getFilterdRestaurantsList(defaultList,'ta', 3);
	expect(list[0].id).toEqual(0);
	expect(list[1].id).toEqual(1);
	expect(list[2].id).toEqual(17);

	// 0 7 5 3 9 - distance, empty search
	list = getFilterdRestaurantsList(defaultList, '', 4);
	expect(list[0].id).toEqual(0);
	expect(list[1].id).toEqual(7);
	expect(list[2].id).toEqual(5);
	expect(list[3].id).toEqual(3);
	expect(list[4].id).toEqual(9);

	// set isFavrite for id=15 and id=4
	list = [...defaultList];
	list[15].isFavorite = true; 
	list[4].isFavorite = true;
	// 4 15
	list = getFilterdRestaurantsList(list, '', 4);
	expect(list[0].id).toEqual(4);
	expect(list[1].id).toEqual(15);

});

