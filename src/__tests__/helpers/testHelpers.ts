import { RestaurantAPIResponse } from "../../types";

export const mockResponse = (status: number, body?: object, jsonShouldFail = false) => ({
    ok: status >= 200 && status < 300,
    status,
    json: jsonShouldFail 
        ? () => Promise.reject(new Error('invalid json'))
        : () => Promise.resolve(body),
}) as unknown as Response;

export const createMockRestaurantApiResponse = (count: number): RestaurantAPIResponse => ({
  restaurants: Array.from({ length: count }, (_, i) => ({
    name: `Restaurant ${i + 1}`,
    cuisines: [{ name: 'Test Cuisine' }],
    rating: {
      starRating: 4,
    },
    address: {
      city: 'Test City',
      firstLine: `Street ${i + 1}`,
      postalCode: '1234AB',
      location: {
        type: 'Point',
        coordinates: [0, 0],
      },
    },
  })),
});