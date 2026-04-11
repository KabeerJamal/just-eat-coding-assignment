import { fetchRestaurantData } from "../api/restaurants";
import { APIError } from "../api/errors";
import { fetchRestaurantsByPostcode } from "../services/fetchRestaurantsByPostcode";

// mock the API layer so we don't make real network calls
jest.mock("../api/restaurants");

const mockPostcode = "EC4M 7RF";

test("should successfully orchestrate fetching and filtering data", async () => {
    const mockRawData = {
        restaurants: [{ name: "Test Resto", rating: { starRating: 5 } }]
    };
    (fetchRestaurantData as jest.Mock).mockResolvedValue(mockRawData);

    const result = await fetchRestaurantsByPostcode(mockPostcode);

    // verify the orchestiration
    expect(fetchRestaurantData).toHaveBeenCalledWith(mockPostcode);
    expect(result).toHaveLength(1);

    const firstResto = result[0]!;

    expect(firstResto.name).toBe("Test Resto");
    expect(firstResto.rating).toBe(5);
});

//Network failure
test("should propagate API errors upward to the UI layer", async () => {
    const apiError = new APIError("Rate limit exceeded", 429);
    (fetchRestaurantData as jest.Mock).mockRejectedValue(apiError);
    await expect(fetchRestaurantsByPostcode(mockPostcode)).rejects.toThrow(apiError);
});
