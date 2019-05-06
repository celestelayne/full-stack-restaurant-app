import React, { Component } from 'react';

import fetchRestaurants from './services/restaurants';

// import axios from 'axios';

import Navbar from './components/Navbar/Navbar';

import RestaurantList from './components/RestaurantList/RestaurantList';
import RestaurantDetail from './components/RestaurantDetail/RestaurantDetail';

// import './App.css';

class App extends Component {

  constructor(){
    super();

    this.state = {
      restaurants: []
    }
    this.restaurants = this.restaurants.bind(this);
  }

  async restaurants() {
    const restaurants = await fetchRestaurants();
    this.setState({
      restaurants: restaurants
    })
    console.log(restaurants)
  }

  componentDidMount(){
    this.restaurants()
  }

  render(){
    console.log(this.state)
    return (
      <div className="App">
        <Navbar
          restaurants={this.state.restaurants.restaurants}/>
        <div className="columns">
          <RestaurantList
            restaurants={this.state.restaurants.restaurants} />
          <RestaurantDetail />
        </div>
      </div>
    )
  }

}

export default App;
