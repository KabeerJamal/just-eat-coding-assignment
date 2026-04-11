import { APIError } from "./errors"


export async function handleResponse<T>(response: Response): Promise<T> {
    return {} as T
}

export async function handleError(error: unknown): Promise<never> {
    throw new APIError('Not implemented', 0, 'NetworkError')
}