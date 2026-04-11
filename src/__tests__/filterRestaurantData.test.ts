import { filterRestaurantData } from "../utils/filterRestaurantData";
import { createMockRestaurantApiResponse } from "./helpers/testHelpers";


//Limit to 10 restaurants
test("should limit output to maximum 10 restaurants when API returns more", () => {
    const mockData = createMockRestaurantApiResponse(11)
    const result = filterRestaurantData(mockData);

    expect(result).toHaveLength(10);
});

// Map all four required fields
test("should correctly map all four required fields", () => {
    const mockData = {
        restaurants: [{
            name: "Pizza Express",
            cuisines: [{ name: "Italian" }, { name: "Pizza" }],
            rating: { starRating: 4.5 },
            address: { firstLine: "123 Street", postalCode: "EC4M" }
        }]
    } as any;

    const result = filterRestaurantData(mockData);

    expect(result).toHaveLength(1);

    expect(result?.[0]).toEqual({
        name: "Pizza Express",
        cuisines: ["Italian", "Pizza"],
        rating: 4.5,
        address: expect.objectContaining({
            firstLine: "123 Street",
            postalCode: "EC4M"
        })
    });
});

//Edge cases
test("should return an empty array if the API data is undefined or empty", () => {
    const mockData = {
    }
    const result = filterRestaurantData(mockData);
    expect(result).toEqual([]);
})

test("should handle missing fields gracefully by providing safe fallbacks", () => {
    const mockData = {
        restaurants: [{
            name: "Empty Restaurant"
        }]
    } as any;

    const result = filterRestaurantData(mockData);

    const firstRestaurant = result[0]!;

    expect(firstRestaurant.name).toBe("Empty Restaurant");

    //Assigning Fallback values
    expect(firstRestaurant.rating).toBe(0);

    expect(firstRestaurant.cuisines).toEqual([]);

    expect(firstRestaurant.address).toEqual({
        city: "",
        firstLine: "",
        postalCode: ""
    });
});


test("should filter out empty or whitespace-only cuisine names", () => {
    const mockData = {
        restaurants: [{
            name: "Test",
            cuisines: [
                { name: "Italian" },
                { name: "" },    // empty string
                { name: " " },   // whitespacee string
                { name: "Pizza" }
            ]
        }]
    } as any;

    const result = filterRestaurantData(mockData);

    // should ignore the two empty/whitespace entries
    expect(result[0]!.cuisines).toEqual(["Italian", "Pizza"]);
});

test("should provide consistent fallbacks for a single 'worst-case' malformed restaurant object", () => {
    const mockData = {
        restaurants: [{
            name: "",
            rating: { starRating: undefined },
            cuisines: [
                { name: "" },
                { name: " " },
                { name: undefined }
            ],
            address: {
                city: null,
                firstLine: undefined,
                postalCode: " "
            }
        }]
    } as any;

    const result = filterRestaurantData(mockData);
    const firstResto = result[0]!;

    //Take the default fallback value
    expect(firstResto.name).toBe("Unknown Restaurant");

    expect(firstResto.rating).toBe(0);

    expect(firstResto.cuisines).toEqual([]);

    expect(firstResto.address).toEqual({
        city: "",
        firstLine: "",
        postalCode: ""
    });
});

