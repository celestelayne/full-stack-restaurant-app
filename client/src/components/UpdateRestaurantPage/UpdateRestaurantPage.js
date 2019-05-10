import React, { Component } from 'react';
// import { Link, Redirect } from 'react-router-dom';

import {
  fetchRestaurants,
  updateRestaurant,
  deleteRestaurant
} from '../../services/restaurants';

class UpdateRestaurantPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      restaurant: props.currentRestaurant,
      updated: false
    }
  }

  handleRestaurantFormChange = (event) => {
    // console.log(event.target.name, event.target.value)
    const element = event.target
    const {name, value} = element

    this.setState(prevState => {
      let newState = prevState.restaurant
      newState[name] = value
      return newState
    })
  }

  render(){
    return(
      <div className="UpdateRestaurantPage">
        <h2 className="title">Update Restaurant</h2>
        <form id="restForm">
            <div className="field">
              <label htmlFor="name">Restaurant Name: </label>
              <input
                type="text"
                name="name"
                id="newRestaurantName"
                placeholder="Restaurant Name"
                defaultValue={this.props.currentRestaurant.name}
              />
            </div>
            <div className="field">
              <label htmlFor="neighborhood">Neighborhood: </label>
              <input
                type="text"
                name="neighborhood"
                placeholder="Neighborhood"
                defaultValue={this.props.currentRestaurant.neighborhood}
              />
            </div>
            <div className="control">
              <button type="submit" className="button">Update Restaurant</button>
            </div>
        </form>
      </div>
    )
  }

}

export default UpdateRestaurantPage
