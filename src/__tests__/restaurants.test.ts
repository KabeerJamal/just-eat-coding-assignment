import { fetchRestaurantData } from "../api/restaurants";
import { mockResponse } from "./helpers/testHelpers";

global.fetch = jest.fn()

const mockFetch = fetch as jest.Mock
const fakePostcode = '1234';

beforeEach(() => {
    jest.clearAllMocks();
  });


describe("restaurants", () => {
        
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
        jest.useFakeTimers();

        mockFetch.mockImplementation((url, options) => {
            return new Promise((resolve, reject) => {
                // simulate hanging request
                //we must listen for the abort signal to break hang
                if (options?.signal) {
                    options.signal.addEventListener('abort', () => {
                        const error = new Error('The operation was aborted');
                        error.name = 'AbortError';
                        reject(error); // this will triggar catch block in my source code
                    });
                }
            });
        });

        const promise = fetchRestaurantData("EC4M7RF");

        // fastforward time
        jest.advanceTimersByTime(3000);

        await expect(promise).rejects.toMatchObject({
            message: "Request timed out",
            status: 0,
            type: 'TimeoutError',
        });

        jest.useRealTimers();
    });

})
