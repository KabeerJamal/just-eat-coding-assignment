import { handleError, handleResponse } from "./clientUtils";
import { API_CONSTANTS } from "./endpoints";
import { RestaurantAPIResponse } from "../types";


export async function fetchRestaurantData(postcode: string): Promise<RestaurantAPIResponse> {
    try {
        const response: Response = await fetch(API_CONSTANTS.GET_RESTAURANTS(postcode))

        return handleResponse<RestaurantAPIResponse>(response)
    } catch (error) {
        return handleError(error)
    }
}
