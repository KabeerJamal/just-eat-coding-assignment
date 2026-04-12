import { useState } from 'react';
import { fetchRestaurantsByPostcode } from '../services/fetchRestaurantsByPostcode';
import { RestaurantUI } from '../types';
import { APIError } from '../api/errors';
import { SearchStatus } from '../types';
import { UK_POSTCODE_REGEX } from '../config/constants';

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
    if(!UK_POSTCODE_REGEX.test(value.trim())) {
      setValidationError('Please enter a valid UK postcode');
      setRestaurants([]);
      return;
    }

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
