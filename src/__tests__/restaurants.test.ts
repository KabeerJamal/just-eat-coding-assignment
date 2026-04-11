import { fetchRestaurantData } from "../api/restaurants";
import { mockResponse } from "./helpers/testHelpers";

global.fetch = jest.fn()

const mockFetch = fetch as jest.Mock
const fakePostcode = '1234';

test('should resolve with mapped API response when network call succeeds', async () => {
    const dummyData = { restaurants: [{ name: "Test" }] } as any;

    mockFetch.mockResolvedValue(mockResponse(200, dummyData));

    await expect(fetchRestaurantData(fakePostcode)).resolves.toStrictEqual(dummyData)
})

test('should reject with a formatted ServerError when API returns an error response', async () => {
    mockFetch.mockResolvedValue({
        ok: false,
        status: 404,
        json: async () => ({ message: 'Something went wrong' }),
    });

    await expect(fetchRestaurantData(fakePostcode)).rejects.toMatchObject({
        message: 'Something went wrong',
        status: 404,
        type: 'ServerError'
    })
})

test('should reject with a formatted NetworkError when the fetch throws an exception', async () => {

    const e = new Error("Network Error")
    mockFetch.mockRejectedValue(e)


    await expect(fetchRestaurantData(fakePostcode)).rejects.toMatchObject({
        message: e.message,
        status: 0,
        type: 'NetworkError',
    })
})

test("should throw a TimeoutError if the request takes too long", async () => {
    // mock fetch to nevver resolve(this is simulating a hang)
    global.fetch = jest.fn(() => new Promise(() => { }));

    await expect(fetchRestaurantData("EC4M7RF"))
        .rejects
        .toMatchObject({ type: 'TimeoutError' });
});