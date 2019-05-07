import React from 'react';
import { Link } from 'react-router-dom';

import FavRestaurant from '../FavRestaurant/FavRestaurant'

import './RestaurantItem.css';

const RestaurantItem = ({restaurant, setCurrentRestaurant}) => {
  return(
    <div className="Restaurant">
      <div className="restaurant-item">
        <Link
          to={`/restaurants/${restaurant.id}`}
          onClick={() => setCurrentRestaurant(restaurant)}>
                <h4>Name: {restaurant.name}</h4>
                <p>Neighborhood: {restaurant.neighborhood}</p>
        </Link>
      </div>
      <FavRestaurant restaurant={restaurant} />
    </div>
  )
}

export default RestaurantItem;
