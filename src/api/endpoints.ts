// wee use  '/api' proxy to bypass CORS
const API_BASE_URL = `/api`

export const API_CONSTANTS = {
    GET_RESTAURANTS: (postcode: string) => `${API_BASE_URL}/${postcode}`
}
