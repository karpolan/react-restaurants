import Restaurants from "./ListOfRestaurants";
import Restaurant from "./RestaurantDetails";

export { 
	Restaurants, // List of Restaurants
	Restaurant 	 // Detailed info for the single Restaurant
};

// Choose the default container here
const CurrentContainer = Restaurants; // List of Restaurants is rendered by default
export default CurrentContainer;
