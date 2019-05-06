import React from 'react';

import FavRestaurant from '../FavRestaurant/FavRestaurant'

import './RestaurantItem.css';

const RestaurantItem = ({restaurant}) => {
  return(
    <div className="Restaurant">
      <div className="restaurant-item">
        <h4>Name: {restaurant.name}</h4>
        <p>Neighborhood: {restaurant.neighborhood}</p>
      </div>
      <FavRestaurant restaurant={restaurant} />
    </div>
  )
}

export default RestaurantItem;
