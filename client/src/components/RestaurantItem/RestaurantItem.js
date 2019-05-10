import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import FavRestaurant from '../FavRestaurant/FavRestaurant'

import {
  fetchRestaurants,
  updateRestaurant,
  deleteRestaurant
} from '../../services/restaurants';

import './RestaurantItem.css';

class RestaurantItem extends Component {

  constructor(props){
    super(props);
    this.state = {
      restaurant: props.restaurant,
      deleted: false,
      formData: {
        name: '',
        neighborhood: ''
      }
    };
  }

  handleRestaurantUpdate = async (id) => {
    const data = await updateRestaurant(this.state.formData, id);

    this.setState(prevState => ({
      restaurant: prevState.restaurants.map(restaurant => (
        restaurant.id === parseInt(id) ? data : restaurant
      )),
      formData: {
        name: '',
        neighborhood: ''
      }
    }))
    // this.props.history.push('/');
  }


  handleRestaurantDelete = async (restaurant) => {
    console.log(restaurant, "Restaurant deleted")

    const resp = await deleteRestaurant(restaurant);

    this.setState({
      deleted: true
    })

  }

  async componentDidMount() {
    const restaurants = await fetchRestaurants();
    this.setState({
      restaurants
    });
  }

  render(){
    if(this.state.deleted){
       return <Redirect to ='/' />
    }
    console.log(this.props)
    const { formData } = this.state;
    return(
      <div className="Restaurant">
        <div className="restaurant-item">
          <Link
            to={`/restaurants/${this.props.restaurant.id}`}
            onClick={() => this.props.setCurrentRestaurant(this.props.restaurant)}>
                  <h4>Name: {this.props.restaurant.name}</h4>
                  <p>Neighborhood: {this.props.restaurant.neighborhood}</p>
          </Link>
          <button onClick={() => this.handleRestaurantDelete(this.props.restaurant.id)}>Delete</button>
          <Link
            to={`/update-restaurant/${this.props.restaurant.id}/edit`}
            onSubmit={this.handleRestaurantUpdate}>Edit Restaurant</Link>
        </div>
        <FavRestaurant restaurant={this.props.restaurant} />
      </div>
    )
  }
}

export default RestaurantItem;
