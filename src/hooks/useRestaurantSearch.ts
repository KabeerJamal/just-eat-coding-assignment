import { useState } from 'react';
import { fetchRestaurantsByPostcode } from '../services/fetchRestaurantsByPostcode';
import { RestaurantUI } from '../types';
import { APIError } from '../api/errors';
import { SearchStatus } from '../types';

export function useRestaurantSearch() {
  const [postcode, setPostcode] = useState('');
  const [restaurants, setRestaurants] = useState<RestaurantUI[]>([]);
  const [status, setStatus] = useState<SearchStatus>('idle');
  const [apiError, setApiError] = useState<APIError | Error | null>(null);
  const [validationError, setValidationError] = useState('');

  function updatePostcode(newPostcode: string) {
    setPostcode(newPostcode);
    if (validationError) {
      setValidationError('');
    }
  }


  function search(postcodeOverride?: string) {
    const value = postcodeOverride !== undefined ? postcodeOverride : postcode;

    setValidationError('');
    setApiError(null);
    setStatus('loading');
    setRestaurants([]);

    fetchRestaurantsByPostcode(value.trim())
      .then((data) => {
          setRestaurants(data);
          setStatus('success');
      })
      .catch((err) => {
        setApiError(err);
        setStatus('error');
      });
  }

  return {
    postcode,
    setPostcode: updatePostcode,
    restaurants,
    status,
    apiError,
    validationError,
    search
  };
}
