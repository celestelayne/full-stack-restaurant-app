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