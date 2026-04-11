import { APIError } from "./errors"


export async function handleResponse<T>(response: Response): Promise<T> {
    let data
    try {
        data = await response.json() as T
    } catch {

        data = {} as T
    }
    if (!response.ok) {
        throw new APIError(
            (data as any)?.message || 'Something went wrong',
            response.status,
            'ServerError'
        );
    }
    return data
}

export async function handleError(error: unknown): Promise<never> {
    if (error instanceof APIError) {
        throw error
    }
    throw new APIError(
        (error as any)?.message || 'Network request failed',
        0,
        'NetworkError'
    );
}

