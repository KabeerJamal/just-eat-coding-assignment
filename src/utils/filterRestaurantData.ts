import { RestaurantAPIResponse, RestaurantUI } from "../types";

/** 
 *Takes the raw API response and maps it to the RestaurantUI contract.
 *Limits output to 10 restaurants and provides safe fallbacks for any missing or malformed fields.
 */
export function filterRestaurantData(getData: RestaurantAPIResponse): RestaurantUI[] {
    return getData.restaurants
        ?.slice(0, 10)
        .map(restaurant => ({
            name: restaurant?.name?.trim() || "Unknown Restaurant",

            // Filter out any cuisine entries with empty or whitespace-only names
            cuisines: (restaurant?.cuisines || [])
                .map(c => c?.name?.trim())
                .filter((name): name is string => !!name),

            rating: restaurant?.rating?.starRating ?? 0,
            address: {
                city: restaurant?.address?.city?.trim() || "",
                firstLine: restaurant?.address?.firstLine?.trim() || "",
                postalCode: restaurant?.address?.postalCode?.trim() || "",
            }
        })) ?? [];
}