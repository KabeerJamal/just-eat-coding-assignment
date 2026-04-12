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

    // Throw this error when there is a timeout
    if (error instanceof Error && error.name === 'AbortError') {
        throw new APIError(
            'Request timed out',
            0,
            'TimeoutError'
        );
    }
    throw new APIError(
        (error as any)?.message || 'Network request failed',
        0,
        'NetworkError'
    );
}


export async function fetchWithTimeout(
    url: string,
    options: RequestInit = {},
    timeoutMs = 3000
): Promise<Response> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        return response;
    } finally {
        clearTimeout(timer);
    }
}