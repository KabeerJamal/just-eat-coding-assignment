import { RestaurantUI } from '../../types';
import { RestaurantCard } from './RestaurantCard';

interface RestaurantListProps {
  restaurants: RestaurantUI[];
}

export function RestaurantList({ restaurants }: RestaurantListProps) {
  if (restaurants.length === 0) {
    return (
      <div className="restaurant-list__empty" aria-live="polite">
        <p>No restaurants found for this postcode. Try another one. 🙂</p>
      </div>
    );
  }

  return (
    <ul className="restaurant-list">
      {restaurants.map((r, i) => (
        <RestaurantCard key={i} restaurant={r} />
      ))}
    </ul>
  );
}