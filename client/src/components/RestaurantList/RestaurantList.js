import React from 'react';

import RestaurantItem from '../RestaurantItem/RestaurantItem'

const RestaurantList = ({restaurants}) => {

  const allRestaurants = restaurants && restaurants.map((restaurant, index) =>
    <RestaurantItem
      key={restaurant.id}
      restaurant={restaurant} />
  )

  return(
    <div className="restaurant-list column is-one-third">
      <h1 className="title">RESTAURANTS</h1>
      { allRestaurants }
    </div>
    )

}

export default RestaurantList;


