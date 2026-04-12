import { handleResponse } from "../api/clientUtils";
import { handleError } from "../api/clientUtils";
import { APIError } from "../api/errors";
import { mockResponse } from "./helpers/testHelpers";


describe('clientUtils', ()=> {
    describe('handleResponse', () => {
        test("should correctly parse and return JSON on a valid response", async () => {
            const response = await handleResponse(mockResponse(200, { restaurants: [] }))
            expect(response).toEqual({ restaurants: [] })
        })
        
        test("should throw a formatted ServerError when response is not ok", async () => {
            await expect(
                handleResponse(mockResponse(404, { message: "uri not found" }))
            ).rejects.toMatchObject({
                message: 'uri not found',
                status: 404,
                type: 'ServerError',
        
            })
        })
        
        test("should return an empty object when JSON parsing fails on a 200 response", async () => {
            const response = await handleResponse(mockResponse(200, { restaurants: [] }, true))
            expect(response).toEqual({})
        })
        
        test("should throw a generic ServerError when response is not ok and JSON is malformed", async () => {
            await expect(
                handleResponse(mockResponse(404, { restaurants: [] }, true))
            ).rejects.toMatchObject({
                message: 'Something went wrong',
                status: 404,
                type: 'ServerError'
        
            })
        })

    })
    describe('handleError', ()=> {
        test("should pass APIError through unchanged when handling errors", async () => {
            await expect(handleError(new APIError(
                'Something went wrong',
                404,
                'ServerError'
            ))).rejects.toMatchObject({
                message: 'Something went wrong',
                status: 404,
                type: 'ServerError'
            })
        
        })
        
        test("should convert standard Error into a formatted NetworkError", async () => {
            const e = new Error("Network Error")
            
            await expect(handleError(e)).rejects.toMatchObject({
                message: e.message,
                status: 0,
                type: 'NetworkError',
            })
        })
    })
})



