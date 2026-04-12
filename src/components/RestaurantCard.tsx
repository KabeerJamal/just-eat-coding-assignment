import { RestaurantUI } from '../types';

interface RestaurantCardProps {
  restaurant: RestaurantUI;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <li style={{ marginBottom: '15px' }}>
      <strong>{restaurant.name}</strong><br />
      Cuisines: {restaurant.cuisines.join(', ')}<br />
      Rating: {restaurant.rating}<br />
      Address: {restaurant.address.firstLine}, {restaurant.address.city}, {restaurant.address.postalCode}
    </li>
  );
}
