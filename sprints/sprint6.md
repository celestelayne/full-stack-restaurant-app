## State and Events

For this sprint, we'll add some events to the restaurant app. We'll keep the events simple for now - each event will simply print a message to the console.

#### Adding Favorites

###### Add a FavRestaurant Component

Create a new component called `FavRestaurant` that will eventually handle whether a restaurant is a user's favorite. The `FavRestaurant` component's render method should return the following:

```js
import React, {Component} from 'react';

class FavRestaurant extends Component {
  render(){
    const isFavorite = (this.state.isFavorite) ? 'remove_from_fav' : 'add_to_fav'
    return(
      <div
        onClick={this.handleClick}
        className="film-row-fave add_to_fav">
        <p className="material-icons">add_to_fav</p>
      </div>
    )
  }
}

export default FavRestaurant;
```

In the `RestaurantItem` component, underneath the `restaurant-item` div, render the `FavRestaurant` component. In the browser, the words `add_to_fav` should appear at the bottom left corner of each restaurant row.

###### Define a `handleClick` function in FavRestaurant

Inside the `FavRestaurant` component, define a function called `handleClick`. The function should accept an event (e) as an argument. Simply log out a message like "clicking on favorite restaurant" for now.

Since you aren't using this anywhere yet, nothing should change.

###### Add an onClick to the FavRestaurant component

Now that you have a function that handles the user clicking a restaurant, connect it to the UI. In the div of `FavRestaurant` render function, add a parameter of `onClick={this.handleClick}`.

In your browser's JavaScript console, you should see the message `handleClick` prints out when the div is clicked.

That's all! Your click is not yet adding favorites, but it is working. Later, you will modify your app so that when the `add_to_fav` icon is clicked, your app adds or removes the selected restaurant from the user's favorites array.

#### Handling Filter Toggling

Eventually, you'll want a Favorite heading that is a clickable link so that when the user clicks "Favorites", the left sidebar will show only the favorite restaurants. Now, you'll make the basis for that functionality.

###### Define a handleFilterClick function in FilmListing

First set up the function that will determine what restaurants are shown in the list. You'll need to be able to tell if you are showing the user all of the restaurants or if you are filtering down to show the user just some of the restaurants.

In RestaurantList, create a `handleFilterClick` function that takes a string filter as an argument. For now, just print a message that says `Setting filter to` and the `filter` argument.

This new function isn't connected to a button in the UI yet, so nothing should change.

###### Add provided markup to display the ALL/FAVES menu
