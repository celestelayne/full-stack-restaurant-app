import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// import axios from 'axios';

import Navbar from './components/Navbar/Navbar';

import RestaurantList from './components/RestaurantList/RestaurantList';
import RestaurantDetail from './components/RestaurantDetail/RestaurantDetail';
import CreateRestaurantPage from './components/CreateRestaurantPage/CreateRestaurantPage'

import {
  fetchRestaurants,
  getRestaurant,
  createRestaurant
} from './services/restaurants';


// import './App.css';

class App extends Component {

  constructor(){
    super();

    this.state = {
      restaurants: [],
      currentRestaurant: {}
    }
    this.fetchRestaurantData = this.fetchRestaurantData.bind(this);
  }

  setCurrentRestaurant = (restaurant) => {
    this.setState({
      currentRestaurant: restaurant
    })
  }

  async fetchRestaurantData() {
    const restaurants = await fetchRestaurants();
    this.setState({
      restaurants: restaurants
    })
    console.log(restaurants)
  }

  componentDidMount(){
    this.fetchRestaurantData()
  }

  render(){
    console.log(this.state.restaurants)
    return (
      <div className="App">
        <Navbar
          restaurants={this.state.restaurants} />

          <div className="columns">
            <div className="column is-one-third">
              <RestaurantList
                restaurants={this.state.restaurants}
                setCurrentRestaurant={this.setCurrentRestaurant} />
            </div>
            <Switch>
              <div className="column is-two-thirds">

                <Route
                  path='/restaurants/:id'
                  render={() => <RestaurantDetail
                                  restaurants={this.state.restaurants}
                                  currentRestaurant={this.state.currentRestaurant} />}
                />
                <Route
                  path='/create-restaurant'
                  component={ CreateRestaurantPage } />

              </div>
          </Switch>
          </div>
      </div>
    )
  }

}

export default App;
