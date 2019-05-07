## Sprint 5: Identify the App Components

#### Getting Started

We'll pass restaurants as props to each component and ultimately use iteration to render one component for each restaurant.

#### Step 1: Create baseline layout

First, create the layout. You'll have a Restaurants column and a Details column.  The App component will render the following code:

```html
<div className="App">
  <div className="restaurant-list">
    <h1 className="section-title">RESTAURANTS</h1>
  </div>

  <div className="restaurant-details">
    <h1 className="section-title">DETAILS</h1>
  </div>
</div>
```

#### Step 2: Create new components

Move the `restaurant-list` and `restaurant-details` into their own separate components (in separate files), `RestaurantListing` and `RestaurantDetails`, respectively.

Make sure you now call these components in `App.js`. Check your app in the browser. If you've done it right, nothing will have changed, and the application will look the same.

```
render(){
  console.log(this.state.restaurants)
  return (
    <div className="App">
      <div className="columns">
        <RestaurantList />
        <RestaurantDetail />
      </div>
    </div>
  )
}
```

#### Step 3: Set initial state to contain a property called restaurants

`constructor()` is a function that invokes when an instance of our class gets initialized. When we call `super()` we're basically saying invoke the same constructor function that the React library defines for their constructor. In addition to that initialize a state for this component in which restaurants is a property and set its value as an empty array. We can then set the state any other time in our application using .setState().

```js
constructor(){
  super();

  this.state = {
    restaurants: []
  }
}
```

#### Use axios to retrieve data from the server

The App component fetches the API for all the restaurants in the database, via the fetchRestaurants() function and sets the state of this component to the array of restaurants that is received.

```js
// app.js

async getRestaurantData() {
  const restaurants = await fetchRestaurants();
  this.setState({
    restaurants
  })
  console.log(restaurants)
}
```
Call the getRestaurantData() function inside of the componentDidMount() method:

```
componentDidMount(){
  this.getRestaurantData()
}
```
The App component is responsible for storing the state, in this case restaurants. The parent component passes this state information (this.state.restaurants) down to its child components, RestaurantList and RestaurantItem, via props.

Before we pass data, we must not forget to bind the getRestaurantData() method to our initial state:

```js
constructor(){
  super();

  this.state = {
    restaurants: []
  }
  this.getRestaurantData = this.getRestaurantData.bind(this);
}
```
Pass the restaurant information (this.state.restaurants) down to its child components: 
```
return (
  <div className="App">
    ...
      <RestaurantList restaurants={this.state.restaurants} />
      <RestaurantDetail restaurants={this.state.restaurants} />
    ...
  </div>
)
```
#### Create RestaurantItem Component

Let's make a Restaurant component which is a unique piece of UI that we can re-use throughout the application and _hard code_ the data (for now).

```
const RestaurantItem = () => {
  return(
    <div className="Restaurant">
      <div className="restaurant-item">
        <h4>Name: Dos Caminos</h4>
        <p>Neighborhood: Meatpacking District</p>
      </div>
    </div>
  )
}

export default RestaurantItem;
```

Now, let’s use an instance of the Restaurant component in the RestaurantsList Component.

```
import RestaurantItem from '../components/RestaurantItem/RestaurantItem'

const RestaurantsList = () => {
    return (
      <div>
        ...
          <RestaurantItem />
      </div>
    );
}
```

#### Create component to render all the restaurants (passing State from parents to children)

In `src/RestaurantsList/RestaurantsList.js` map over the RestaurantsList render the RestaurantItem component inside the map() method:

```
import RestaurantItem from '../RestaurantItem/RestaurantItem'
  
const RestaurantList = ({restaurants}) => {

  const allRestaurants = restaurants && restaurants.map((restaurant, index) =>
    <RestaurantItem
      key={index}
      restaurant={restaurant} />
  )

  return(
    <div className="RestaurantsList column is-one-third">
      { allRestaurants }
    </div>
    )
}

export default RestaurantList;
```

In src/components/RestaurantItem/RestaurantItem.js replace the hard coded from the Building component data with the building props from the server, passed down from the BuildingsList:

```
const RestaurantItem = ({restaurant}) => {
  return(
    <div className="Restaurant">
      <div className="restaurant-item">
        <h4>Name: {restaurant.name}</h4>
        <p>Neighborhood: {restaurant.neighborhood}</p>
      </div>
    </div>
  )
}

export default RestaurantItem;
```
####  Create component to render one building

Create a RestaurantDetail Component. Start with an empty div with some text in it. Get it rendering and then go from there.

```
import React from 'react';

const RestaurantDetail = () => (
  <div className="RestaurantDetails">
    <h1 className="title">DETAILS</h1>
    Restaurant Detail Page
  </div>
)

export default RestaurantDetail;

Check the browser (you should see Restaurant Detail Page), [http://localhost:3000/restaurants/1](http://localhost:3000/restaurants/1)
```
Currently, the state for RestaurantsList and RestaurantDetail is being kept in the App component. However, we want these two components to be in sync with each other so that when we click on the restaurant update the currentRestaurant being rendered in the browser.

#### Passing State from child to parent aka lifting state

In React, sharing state is accomplished by moving it up to the closest common ancestor of the components that need it. This is called "lifting state up". In this case, we will initialize the state of the currentBuilding in the App component, then define a method called setCurrentBuilding that will change the state of the current building and pass them down to the child components.

Let’s see how this works step by step:

###### Define intial state and method
```js
// ../App.js

this.state = {
  restaurants: [],
  currentRestaurant: {}
}
```

First, we define state in parent component (in this case App) by initializing the state of the currentRestaurant with an empty object in the constructor. Then define a method that will change the state and will be passed to the child component (in this case, setCurrentRestaurant).

```
setCurrentRestaurant = (restaurant) => {
  this.setState({
    currentRestaurant: restaurant
  })
}
```
###### Pass the setCurrentRestaurant method to the child component

Now, in the `render()` function of the RestaurantList route, pass the setCurrentRestaurant method to the child component, RestaurantList so that it's now available as a prop in the RestaurantList component:

```
    render(){
    ...
      <RestaurantList
        restaurants={this.state.restaurants}
        setCurrentRestaurant={this.setCurrentRestaurant} />
    ...
  }
```
In the RestaurantList component, pass the setCurrentRestaurant method as props and set it in the Restaurant component (Note: these are functional components which allow you to destructure your props, allowing you to get rid of props / this.props):

```
// ../RestaurantList/RestaurantList.js

const RestaurantList = ({restaurant, setCurrentRestaurant}) => {
    ...
    <RestaurantItem
        key={index}
        restaurant={restaurant}
        setCurrentRestaurant={setCurrentRestaurant} />
    ...
}
```

###### Pass currentBuilding object to child component

Then, in the render() function of the RestaurantDetail route, pass the currentRestaurant object to the RestaurantDetail route, so that it's now available as a prop in the RestaurantDetail component:

```
    render(){
    ...
      <RestaurantDetail
        restaurants={this.state.restaurants}
        currentRestaurant={this.state.currentRestaurant} />
    ...
  }
```

###### Add setCurrentRestaurant to event handler

In the RestaurantItem component, pass the setCurrentRestaurant method as destructured props. Then, add an onClick event handler through react router's element to render a fully accessible anchor tag with the proper href. Note: This link element wraps the building name only.

```
const RestaurantItem = ({restaurant, setCurrentRestaurant}) => {
    <Link
      to={`/restaurants/${restaurant.id}`}
      onClick={() => setCurrentRestaurant(restaurant)}>
            <h3>Name: {restaurant.name}</h3>
    </Link>
}
```

###### Pass `currentBuilding` as destructured object (props)

Finally, pass the `currentRestaurant` as a destructured object down to the RestaurantDetail component as a prop and use it to dynamically populate the page.

```
const RestaurantDetail = ({currentRestaurant}) => {
  return (
      <div className="RestaurantDetail">
        <p className="title is-4">{currentRestaurant.name}</p>
        <p className="subtitle is-6">{currentRestaurant.neighborhood}</p>
      </div>
  )
}
```

#### Creating Restaurants

We're going to want to create a component that handles the form for creating new restaurants. Before we build this feature out, how can we pass state from a child component to a parent? The opposite is easy, because we're able to just pass properties to our child components. Child state to parent state is much more difficult because we can't pass properties like that. Its unidirectional. The answer: callbacks.

Let's create a file `src/components/CreateRestaurantPage/CreateRestaurantPage.js` and fill it out with the following:

```js
import React from 'react';

const CreateRestaurantPage = () => {
    return (
      <h2>
        This is the Create New Restaurant Page.
      </h2>
    );
}

export default CreateRestaurantPage;
```

Your Header component should have a Link to the create-restaurant path:

```
<Link className="navbar-item" to={'/create-restaurant'}>Create Restaurant</Link>
```

Finally, in the App component, add a route that renders the CreateRestaurantPage component:

```
render(){
  console.log(this.state.restaurants)
  return (
    <Route
      path='/create-restaurant'
      component={ CreateRestaurantPage } />
  )
}
```

#### Create the new builidng form

First, we define the initial state of the form in the constructor.

We define the initial state of the form in the constructor.

Looks like a form. When it gets submitted we run two functions (we're using es6 arrow function here to pass an anonymous function with an event argument). They are the `onFormSubmit` and `onFormChange` functions defined in this component.
