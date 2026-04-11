export interface RestaurantAPIResponse {
    restaurants?: {
        name?: string,
        cuisines?: { name?: string }[],
        rating?: { starRating?: number },
        address?: {
            city?: string;
            firstLine?: string;
            postalCode?: string;
        };
    }[];
}

export interface RestaurantUI {
    name: string;
    cuisines: string[];
    rating: number;
    address: {
        city: string;
        firstLine: string;
        postalCode: string;
    };
}

