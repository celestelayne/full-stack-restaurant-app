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
