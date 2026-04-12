import { RestaurantUI } from '../types';
import { RestaurantCard } from './RestaurantCard';

interface RestaurantListProps {
  restaurants: RestaurantUI[];
}

export function RestaurantList({ restaurants }: RestaurantListProps) {
  if (restaurants.length === 0) {
    return <p>No restaurants exist in this postcode. Try another one.</p>;
  }

  return (
    <ul>
      {restaurants.map((r, i) => (
        <RestaurantCard key={i} restaurant={r} />
      ))}
    </ul>
  );
}
