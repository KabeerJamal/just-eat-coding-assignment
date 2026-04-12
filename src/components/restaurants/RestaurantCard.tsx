import { RestaurantUI } from '../../types';

interface RestaurantCardProps {
  restaurant: RestaurantUI;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <li className="restaurant-card">
      <div className="restaurant-card__header">
        <h2 className="restaurant-card__name">{restaurant.name}</h2>
        <span className="restaurant-card__rating">{restaurant.rating} ★</span>
      </div>

      <p className="restaurant-card__cuisines">{restaurant.cuisines.join(' · ')}</p>

      <p className="restaurant-card__address">
        {restaurant.address.firstLine}, {restaurant.address.city}, {restaurant.address.postalCode}
      </p>
    </li>
  );
}