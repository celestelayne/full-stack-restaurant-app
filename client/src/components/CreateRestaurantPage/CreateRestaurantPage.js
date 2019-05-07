import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import axios from 'axios'

import {
  fetchRestaurants,
  getRestaurant,
  createRestaurant
} from '../../services/restaurants';

class CreateRestaurantPage extends Component {

  constructor(){
    super()

    this.state = {
      restaurant: [],
      created: false
    }
  }

  onFormChange = (event) => {

    const element = event.target;
    // console.log(event.target.name, event.target.value)
    const name = element.name;
    const value = element.value;

    const newState = {};
    newState[name] = value;
    this.setState(newState);
  }

  // async handleCreate(e) {
  //   e.preventDefault();
  //   const restaurant = await createRestaurant(this.state.formData);
  //   this.setState(prevState => ({
  //     formData: {
  //       name: '',
  //       neighborhood: ''
  //     },
  //     restaurants: [...prevState.restaurants, restaurant]
  //   }));
  //   this.props.history.push('/');
  // }

  onFormSubmit = async (event) => {
    console.log(`Form submitted:`);
    console.log(`Restaurant Name: ${this.state.name}`);

    event.preventDefault()
      let newRestaurant = {
         name: this.state.name,
         neighborhood: this.state.neighborhood
      }
    console.log(newRestaurant);

    const restaurant = await createRestaurant(newRestaurant);

    this.setState({
      restaurant: restaurant,
      created: true
    })
  }

  render(){

    if (this.state.created === true) {
      return <Redirect to="/" />
    }

    return (
      <div className="CreateRestaurantPage">
        <h2 className="title">Create New Restaurant</h2>
        <form onSubmit={ this.onFormSubmit } onChange={ this.onFormChange } id="restForm">
            <div className="field">
              <label htmlFor="name">Restaurant Name: </label>
              <input
                type="text"
                name="name"
                id="newRestaurantName"
                placeholder="Restaurant Name"
                value={this.state.name}
              />
            </div>
            <div className="field">
              <label htmlFor="neighborhood">Neighborhood: </label>
              <input
                type="text"
                name="neighborhood"
                placeholder="Neighborhood"
                value={this.state.neighborhood}
              />
            </div>
            <div className="control">
              <button type="submit" className="button">Add Restaurant</button>
            </div>
        </form>
      </div>
    )
  }
}

export default CreateRestaurantPage;
