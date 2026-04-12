import { filterRestaurantData } from "../utils/filterRestaurantData";
import { RestaurantUI } from "../types";
import { fetchRestaurantData } from "../api/restaurants";

//No try catch needed here, cause error just propogated upwards
/**
 * 
 * The error becomes an unhandled promise rejection.
In Node.js, process can crash. In the browser, it is logged as an error in the console, but the app keeps running (usually).
So always have a top-level catch, either via try/catch or .catch() on the promise.
 */
export async function fetchRestaurantsByPostcode(postcode: string): Promise<RestaurantUI[]> {
    const rawData = await fetchRestaurantData(postcode)
    const filteredData = filterRestaurantData(rawData)
    return filteredData
} 