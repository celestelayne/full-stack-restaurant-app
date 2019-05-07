import React from 'react';

const RestaurantDetail = ({currentRestaurant}) => (
  <div className="RestaurantDetails">
    <h1 className="title">DETAILS</h1>
    <p className="title is-4">{currentRestaurant.name}</p>
    <p className="subtitle is-6">{currentRestaurant.neighborhood}</p>
  </div>
)

export default RestaurantDetail;
