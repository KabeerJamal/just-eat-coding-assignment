import { useState } from 'react';
import { fetchRestaurantsByPostcode } from './services/fetchRestaurantsByPostcode';
import { RestaurantUI } from './types';
import { APIError } from './api/errors';

const POSTCODES = [
    'CT1 2EH', 'BS1 4DJ', 'L4 0TH', 'NE9 7TY',
    'SW1A 1AA', 'CF11 8AZ', 'M16 0RA', 'EH1 1RE',
    'BN1 1AE', 'CB7 4DL', 'LS2 7HY', 'G3 8AG',
    'PL4 0DW', 'B26 3QJ', 'DH4 5QZ', 'BT7 1NN', 'EC4 M7RF'
];

const UK_POSTCODE_REGEX = /^[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}$/i;

export default function App() {
    const [selectedPostcode, setSelectedPostcode] = useState('');
    const [restaurants, setRestaurants] = useState<RestaurantUI[]>([]);
    const [error, setError] = useState('');
    const [hasSearched, setHasSearched] = useState(false);
    const [apiError, setApiError] = useState<APIError | Error | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    function handleFetch() {
        if (!UK_POSTCODE_REGEX.test(selectedPostcode.trim())) {
            setError('Please enter a valid UK postcode');
            return;
        }
        setError('');
        setApiError(null);
        setHasSearched(false);
        setIsLoading(true);
        setRestaurants([]);

        fetchRestaurantsByPostcode(selectedPostcode.trim())
            .then((data) => {
                setRestaurants(data);
                setHasSearched(true);
                setIsLoading(false);
            })
            .catch((err) => {
                setApiError(err);
                setIsLoading(false);
                console.error('Error fetching restaurants:', err);
            });
    }

    return (
        <div>
            <input
                type="text"
                value={selectedPostcode}
                onChange={(e) => { setSelectedPostcode(e.target.value); setError(''); }}
                placeholder="Enter postcode (e.g. SW1A 1AA)..."
            />

            <select
                onChange={(e) => { setSelectedPostcode(e.target.value); setError(''); }}
                value=""
            >
                <option value="" disabled>Example postcodes</option>
                {POSTCODES.map((pc) => (
                    <option key={pc} value={pc}>{pc}</option>
                ))}
            </select>

            <button onClick={handleFetch} disabled={isLoading}>
                {isLoading ? 'Searching...' : 'Search'}
            </button>

            {isLoading && (
                <div style={{ margin: '15px 0', fontStyle: 'italic', color: '#555' }}>
                    ⏳ Loading restaurants...
                </div>
            )}

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {apiError && (
                <div style={{ padding: '10px', border: '1px solid red', backgroundColor: '#ffe6e6', margin: '10px 0' }}>
                    <p style={{ color: 'red', margin: '0 0 10px 0' }}>
                        <strong>{apiError instanceof APIError ? `Error ${apiError.status} (${apiError.type})` : 'Error'}:</strong> {apiError.message}
                    </p>
                    <button onClick={handleFetch}>Try Again</button>
                </div>
            )}

            {hasSearched && restaurants.length === 0 && (
                <p>No restaurants exist in this postcode. Try another one.</p>
            )}

            <ul>
                {restaurants.map((r, i) => (
                    <li key={i}>
                        <strong>{r.name}</strong><br />
                        Cuisines: {r.cuisines.join(', ')}<br />
                        Rating: {r.rating}<br />
                        Address: {r.address.firstLine}, {r.address.city}, {r.address.postalCode}
                    </li>
                ))}
            </ul>
        </div>
    );
}
