import React from 'react';

import RestaurantItem from '../RestaurantItem/RestaurantItem'

const RestaurantList = ({restaurants, setCurrentRestaurant}) => {

  const allRestaurants = restaurants && restaurants.map((restaurant, index) =>
    <RestaurantItem
      key={index}
      restaurant={restaurant}
      setCurrentRestaurant={setCurrentRestaurant} />
  )

  return(
    <div className="RestaurantsList">
      <h1 className="title">RESTAURANTS</h1>
      { allRestaurants }
    </div>
    )

}

export default RestaurantList;


