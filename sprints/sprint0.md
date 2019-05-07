## Sprint 0: Setting Up the Database

#### Getting Started

First, create a new directory called `restaurant_app`

```bash
$ mkdir restaurant_app
```

Change into the directory and run git init and npm init, respectively.

```
$ cd restaurant_app

$ git init
$ npm init
```

> Note: The first command initializes an empty Git repository and the second walks you through creating a package.json file.
 
Create the database

```bash
$ createdb restaurant_db
```

Install the required dependencies (including sequelize)

```bash
$ npm install sequelize pg
```

#### Sequelize Setup

Before actually defining a model, we first need to [set up a database connection](http://docs.sequelizejs.com/manual/getting-started.html#setting-up-a-connection) -- between our javascript application and our SQL database. 

Create a file called `models.js`

```bash
$ touch models.js
```

To set up the basic connection between the two:

```js
const { Sequelize } = require('sequelize');

const db = new Sequelize({
  database: 'restaurant_db',
  dialect: 'postgres',
  define: {
    underscored: true,
  },
});

The resulting db object is conventionally exported from the models.js file.

module.exports = {
  db
};
```

Now that the db has been set up, we can now attach model definitions using `define()`

#### Synchronize the model with the database

Create a file called `resetDb.js`

```bash
$ touch resetDb.js
```
In order for Sequelize to automatically create the table according to your model definition, you can use the sync method, to [synchronize the model with the database](http://docs.sequelizejs.com/manual/getting-started.html#synchronizing-the-model-with-the-database):

```js
const { db } = require('../models');

const resetDb = async () => {
  try {
    await db.sync({ force: true }); <------ force sync all models
    console.log('noice, database synced');
  } catch (e) {
    console.log(e);
  } finally {
    await process.exit();
  }
}

resetDb();
```


#### Define Models

Models are defined using `db.define('name', {attributes}, {options})`.

We pass two arguments to the method: (1) the name of the model; (2) the model properties with corresponding value (the properties’ datatype).

```js
const Restaurant = db.define('restaurant', {
  name: Sequelize.STRING,
  neighborhood: Sequelize.STRING
});

const Review = db.define('review', {
  description: Sequelize.TEXT
});

const Cuisine = db.define('cuisine', {
  style: Sequelize.STRING
});
```
The above code tells Sequelize to expect a table named restaurant in the database with the fields _name_ and _neighborhood_.

Don’t forget to export your models:

```js
module.exports = {
  db,
  Restaurant,
  Cuisine,
  Review,	
};
```

#### Model Associations

In order to tie our models together, we need to make associations. Considering a one-to-many relationship for restaurants and their reviews, Sequelize offers `hasMany` and `belongsTo` methods on each model to register these relationships.

```js
Restaurant.hasMany(Review, {
  onDelete: 'cascade'
});

Review.belongsTo(Restaurant)
```

#### Relating two instances

By using the method `hasMany`, Sequelize will create a series of methods for us that we can use on any instance of the source model. We'll be using these in the `seedDb.js` file:

- review.setRestaurant(restaurant);

```js
const motorino = Restaurant.create({
  name: 'Motorino',
  neighborhood: 'East Village'
})

const review = Review.create({
  description: "The service wasn't great, but oh my, the pizza was arguably THE BEST we have ever had in NYC."
})

review.setRestaurant(motorino)
```

#### Accessing related instances

A model with relationships defined will have a setOtherModel() method defined, to establish a relationship. 

###### Method 1: Model Relations

```js
const restaurant = Restaurant.findByPk(1);
const restaurantReviews = restaurant.getReviews();
// [ { description: 'The service wasn't great, but oh my, the pizza', ... }];
```

###### Method 2: Eager Loading

Implementing eager loading allows us to `include` a related resource within the query.

```js
// with given Restaurant & Review models
// Restaurant.hasMany(Review);

app.get('/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll({
        include: [ Review ]       
    });
    res.send(restaurants);  
  } catch (e) {
    res.status(500).json({ msg: e.message  });             
   }       
});
```
Run `npm start`, open `localhost:3000` on your browser, visit each of your endpoints, and check to make sure the correct data is being displayed.
